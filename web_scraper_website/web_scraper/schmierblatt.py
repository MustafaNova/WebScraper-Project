from thefuzz import fuzz,process

Brands_dic={
             "https://www.saturn.de/de/brand/apple?query=":
            set(["iphone", "ipad", "mac", "apple watch", "airpods", "apple tv", "homepod", "ipod",
             "apple pencil", "magic keyboard", "magic mouse", "mac studio", "airtag","homepod","appletv"])
        }


print(process.extractOne("iphone",Brands_dic["https://www.saturn.de/de/brand/apple?query="]))
    

