from Main import main
import random, asyncio,logging

produktnamen = [
    "Samsung Galaxy S24",
    "Apple iPhone 15 Pro",
    "Sony WH-1000XM5 Kopfhörer",
    "LG OLED55C37 Fernseher",
    "Bosch Serie 6 Waschmaschine",
    "PlayStation 5 Konsole",
    "Microsoft Xbox Series X",
    "JBL Charge 5 Bluetooth Lautsprecher",
    "Dyson V15 Detect Staubsauger",
    "Canon EOS R50 Kamera",
    "Philips Hue White & Color Starter Set",
    "Lenovo Legion 5 Gaming Laptop",
    "Acer Nitro 27\" Gaming Monitor",
    "Nintendo Switch OLED",
    "Apple MacBook Air M2",
    "Samsung Galaxy Tab S9",
    "Bose SoundLink Revolve II",
    "Huawei Watch GT 4",
    "Tefal OptiGrill Elite",
    "Krups Evidence Plus Kaffeevollautomat",
    "HP Envy x360 Convertible",
    "Fitbit Charge 6",
    "Logitech MX Master 3S Maus",
    "Medion Erazer Beast X40",
    "DJI Mini 4 Pro Drohne",
    "Rowenta Silence Force Staubsauger",
    "ASUS ROG Strix RTX 4070 Grafikkarte",
    "WD Black SN850X SSD 2TB",
    "TP-Link Deco XE75 Mesh System",
    "Oral-B iO Series 10 Zahnbürste",
    "SodaStream Duo Wassersprudler",
    "AEG Wärmepumpentrockner 8000",
    "Braun Series 9 Pro Rasierer",
    "Garmin Edge 840 Fahrradcomputer",
    "OnePlus 12 Smartphone",
    "Logitech G Pro X Superlight Maus",
    "Samsung Smart Monitor M8",
    "Anker PowerCore 20000 Powerbank",
    "Beats Studio Pro Kopfhörer"
]


def randomFilter(filterDic):
    tempfilterDic= {}
    
    # keyWord 'bewertung'
    bewertung= ["5 &mehr","4 &mehr","3 &mehr","2 &mehr","1 &mehr"]
    # keyWord 'filter'
    filter= ["Preis: aufsteigend","Preis: absteigend","Bewertungen","TopSeller"]

    # preis
    a= random.randint(1,2000)
    b= random.randint(1,2000)
    if a>=b:
        preisRange= f"{b} - {a}"
    else:
        preisRange= f"{a} - {b}"
       
    tempfilterDic["preis"]= [preisRange]
    
    # speicherKapazität
    speicherKap= ["64GB & mehr","128GB & mehr","256GB & mehr","512GB & mehr","1TB & mehr"]
    speicher= random.choice(speicherKap)
    tempfilterDic["speicherKap"]= [speicher]
    
    # bewertung
    bew= random.choice(bewertung)
    tempfilterDic["bewertung"]= [bew]
    
    # filter
    filt= random.choice(filter)
    tempfilterDic["filter"]=[filt]
    
    
    # random subset from filterDic
    randomNum= random.randint(0,4)
    subset= random.sample(list(tempfilterDic.keys()),randomNum)
    
    # write to original filterDic
    for k in subset:
        filterDic[k]= tempfilterDic[k]
    
    
    
logging.basicConfig(
    filename= "mainSaturn.log",
    format= "%(asctime)s - %(message)s" #eingaben({user_input},{startpoint},{filterDic}) - {e}
)


try: 
    filterDic= {}
    activeScraper= set(["Saturn"])
    timeout= 22222222
    for produkt in produktnamen:
     logging.error(produkt)

     startpoint= random.randint(1,2000)
     randomFilter(filterDic)

     asyncio.run(main(produkt,filterDic,startpoint,activeScraper,timeout))

except Exception as e:
    logging.error(e)


