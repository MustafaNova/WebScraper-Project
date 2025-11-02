from django.db import models

class ScraperData(models.Model):
    name= models.CharField(max_length=200)   
    aktuellerPreis=models.FloatField(null=True)
    vorherigerPreis=models.FloatField(null=True)
    rabatt=models.IntegerField(null=True) 
    sterne=models.CharField(max_length=20, null=True)  # Format-> '4,1,0,67' 4(Anzahl volleSterne),1(Antahl halbeSterne),0(Anzahl leere Sterne),67(Anzahl Bewertungen)
    produktUrl=models.CharField(max_length=300, null=True)
    imageUrl=models.CharField(max_length=300, null=True)
    createdTime=models.DateTimeField(auto_now_add=True) #automatisch aktuelle Zeitpunkt speichern
    
  
        
    def __str__(self):
        return f"---Datenbank Eintrag---\nname: {self.name}\naktuellerPreis: {self.aktuellerPreis}\nvorherigerPreis: {self.vorherigerPreis}\nrabatt: {self.rabatt}\nsterne: {self.sterne}\nproduktUrl: {self.produktUrl}\nimageUrl: {self.imageUrl}\n-----------------------\n"
    
 
# the productinformations of saturn
class ProductDetails_saturn(models.Model):
    name= models.CharField(max_length=200)
    data= models.JSONField()
    
# the productinformations of otto
class ProductDetails_otto(models.Model):
    name= models.CharField(max_length=200)
    data= models.JSONField()
