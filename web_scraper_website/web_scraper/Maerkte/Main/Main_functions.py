import asyncio,sys
sys.path.append(r"C:\Users\musta\WebScraperProjekt\web_scraper_website\web_scraper")
from web_scraper.Maerkte.Otto.prepareO import prepareOtto
from web_scraper.Maerkte.Otto.scraperO import scraper_otto
from web_scraper.Maerkte.Saturn.prepareS import prepareSaturn
from web_scraper.Maerkte.Saturn.scraperS import scraper_saturn
from playwright.async_api import Page

def debugPrint(res):
    
    print("\nRESULTS OF SCRAPING:\n----\n")
    for prod in res["results"]:
     
      print(f"Name: {prod[0]}\nPreis: {prod[1]}\nBewertung: {prod[2]}\n\n")
    print("----\n\n")



async def prepare_scraping(user_input: str, filterDic: dict, startpoint: int, activeScraper: set, context ) -> dict|bool:
          
    try:          
     async with asyncio.timeout(30):
      async with asyncio.TaskGroup() as tg:
        
        if "Saturn" in activeScraper:
         saturnRes=tg.create_task(prepareSaturn(user_input,context,startpoint,filterDic,activeScraper))

                 
        if "Otto" in activeScraper:
         ottoRes=tg.create_task(prepareOtto(startpoint,user_input,filterDic,context,activeScraper))
         
    
    
    except asyncio.TimeoutError:
        print(f"\n---\nFEHLER Main.py: TimeoutError bei Browser Tasks\n---\n")
        return False
    
    except Exception as e:
        print(f"\n---\nFEHLER Main.py: {e}\n---\n")
        return False
    
    
    # 2 Options: it has the right results or the result is None
    results: dict= {}
    if "Saturn" in activeScraper:
     results["Saturn"]= saturnRes.result()
    if "Otto" in activeScraper:
     results["Otto"]= ottoRes.result() 
    

    return results



     

    
    
def bigger_than_maxNum(prepMarkt, curProd, maxNum, activeScraper,Markt: str) -> bool:
    if prepMarkt!=None and curProd > maxNum:
     activeScraper.discard("Saturn") if Markt=="Saturn" else activeScraper.discard("Otto")
     return True
    
    return False




    

           
# this runs in for loop several times
async def creating_Saturn_task(localNumProd:int, prepSaturn: list,  activeScraper: set, startpoint, user_input, filterDic):
    
  normalpage: Page= prepSaturn[0]
  loadMoreBtn: bool= prepSaturn[1]
    
  
  # no Button to load more products but more products are needed => scraper is at the end
  if not loadMoreBtn and localNumProd > 11:
      activeScraper.discard("Saturn")
      return None
  
                                                        
  task_saturn=asyncio.create_task(scraper_saturn(localNumProd,normalpage,activeScraper,startpoint,user_input,filterDic)) 
  return task_saturn
  
  
 


           
#prepOtto[0] == page. wenn overflowpage gehen muss, soll es originale prepOtto[0] verändern und nur noch da scrapen        
async def creating_Otto_task(prepOtto: list,curProd: int, activeScraper: set,): 
    
  try:   
    normalpage: Page= prepOtto[0]
    overflowpage: bool|Page= prepOtto[1]
    pageMax, maxNum= prepOtto[2], prepOtto[3]
      
    
    if bigger_than_maxNum(prepOtto, curProd, maxNum, activeScraper, "Otto"):
        return None
    

    selected_page= overflowpage if curProd > pageMax else normalpage
    
    
    task_otto=asyncio.create_task(scraper_otto(curProd,selected_page,activeScraper))
    return task_otto
  
  except Exception as e:
      print(f"Main_functions.py(z.115): {e}")
      return None



#Tasks für die Märkte erstellen
# Markt Name in activeScraper notwendig für Start
async def creating_scraper_tasks(startpoint: int,activeScraper: set,prep: dict, user_input, filterDic) -> list:
  
    # position of saturn product on page. here it starts
    localNum_saturn= (startpoint-1)%12 

    alle_produkte= []
    for zahl in range(startpoint,startpoint+6): #+4,
        
        # Otto
        if "Otto" in activeScraper:
          task_otto= await creating_Otto_task(prep["Otto"], zahl, activeScraper)
          alle_produkte.append(task_otto)
        
                       
        # Saturn     
        if "Saturn" in activeScraper:
         task_saturn= await creating_Saturn_task(localNum_saturn, prep["Saturn"], activeScraper, startpoint, user_input, filterDic)
         localNum_saturn+=1
         alle_produkte.append(task_saturn)
        
        
    return alle_produkte



async def give_correct_returnValue(alle_produkte: list, activeScraper: set, timeForScraper: int) -> dict:
    
    if alle_produkte==[]:
      return {"results":[],"activeScraper":activeScraper}
      
    alle_produkte= [task for task in alle_produkte if task is not None]
     
    # waiting a certain amount of time
    done,pending= await asyncio.wait(alle_produkte,timeout=timeForScraper)

    for task in pending:   
      task.cancel()
      try: 
        await task    
      except asyncio.CancelledError: pass
      
    # scraping not finished in timelimit  
    if len(done) == 0: 
      return {"results":[],"activeScraper":activeScraper,"timeoutFehler":True}
                
    results=[task.result() for task in done if task.result()!=None]
    
    return {"results":results,"activeScraper":activeScraper}
  
  
  
  