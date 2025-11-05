#nW -> not working
#tW -> test if its working right

#commands: 
# celery -A web_scraper_website worker -l info -P solo   
# VIRTUAL ENVIRONMENT ACTIVATE: virtualEnv/Scripts/activate
# startordner: web_scraper_website\web_scraper


#commit(alles in ein satz zsmfassen):
# CM open,close,resize also working at fullscreen


#todos:

# website erste 6 produkte scrapen und wenn auf produkt clicked, soll weitere seite mit produktdetails anzeigen:
 # produktdetails seite designen produkt (https://www.saturn.de/de/product/_apple-ipad-air-wi-fi-2025-7-generation-tablet-128-gb-11-zoll-blau-2984224.html):
  # obige leiste von saturnseite nachmachen(index.html):
   # wenn registriert soll in datenbank user info speichern(password soll hashen):
    
    # CM toggle-btn normal und fullscreen machen functions.js l.2052, wenn btn clicked, soll flex-basis statt 100% 93% machen, aber dann ist fullscreen bissl verschoben das beheben
    # wenn CM closed switch normal und fullscreen -> tW
    # geht transition noch richtig bei normale, fullscreen märkteSLide
    # CM-selections untere box mehr platz nach unten
    # CM erst d-none, dann animation öffnen, alle auswählen btn click second-height,first-height ändert es, ist das unnötig? entfernen wenn ja
    # unten bissl freiraum bei normale window CM und fullscreen CM auch
    # fullscreen CM nach oben resizen, graue bereich muss gröser werden, bis nach oben das nur eine box oberhalt ist resizen können
    # zwischen fullscreen wehcsel cm sieht man kurz animation
    # märkte/marken Slide anpassen, CM mehr nach unten, wenn CM öffnet bei fullscreen anpassen
    # chosenboxen die erste slide eingefügt werden, diese position anpassen
    # vollbildschirm anpassen filter-menu an alle bildhscirme, also mit vw,vh einstellen
    # märkte/marken bei ausgewählten märkte boxne auch bei hover soll box animation wie die selections-boxen haben
    # functions.js von filtermenu aufteilen in mehrere kleinere dateien thematisch
    # vollbildmodus filterMenu anpassen
    
    # EvtManager listenerRegistration, so anpassen das auf el, mehrere events mit deren funktionen anwenden kann, zb filter_menu alle events sind auf einem event, das kann man in eine liste packen statt 3 separate listen => mehr übersicht
    
    # produktboxen canva chatgpt design soll machen für eine box und das mit grid machen(repsonsive layout) 
    # filtermenu chatgpt canvas bessere design fragen und machen
    # alle anderen menus chatgpt schicken und nach bessere design fragen
    # märkte/menu fade in machen bei scroll bereich
    # wenn bottomSLide öffnet sieht man bei menubar rechts weiße streifen noch
    # choosenbox kreuz icon font awesome ein anderes nehmen
    # accountSlide auge clicken verschiebt sich offene auge bissl nach rechts
    # accountSlide beim schliesen, schliest es nicht clean wie filtermenu
    # filterbottom bei allen slides abstand zu oben soll gleich sein
    # wenn cube menubar next/last slide macht wird kleiner,gröser bissl bleibt nicht bei gleicher gröse
    # filterMenu wenn TopSeller clickt dann wird choosenbox hinzugefügt. aber es soll nicht hinzufügen
    # bottomSlide choosenfilter boxen wo einfügen bei standardSlide bereich
    # choosen boxen und alle löschen submit btn rechts richtig zentrieren
    # wenn preisslide preisinput rechte anclicke dann wird choosen box hinzugefügt, aber bei default soll nicht hinzufügen
    # filter rightSlide auch layout nochmal anpassen
    # wenn vollbildschirm mache, dann right slide geht nicht bis nach unten
    # arrowUp bei bottomSlide ist nicht auf der gleichen höhe wie die überschrift, arrowUp bissl hoch verschieben
    # überscrhfit mit icon bei show bei manchen nicht gleiche höhe
    # accountslide soll auch wie filtermenu ab gleiche px width von unten kommen
    # produktboxen design chatpgt fragen, mit runde border futuristisch modern
    # navBar.js window eventlistener löschen
    # wenn submit clicke bei menu dann schliest menu und schwarze layout noch drauf
    # wenn bottomSlide immer kleiner wird bis zu kleinste width schauen ob alles passt oder etwas sich schlecht verschiebt
    # bei js show funktion soll schauen window.innerWidth. wenn kleiner 1060px dann openBit_bottom openBigBit_bottom benutzen
     # kreuz oben rechts zum schliesen des menus, alles auserhalb menu soll nicht anclickbar sein, mit filterbtn kann menu nicht geschlossen werden, nur mit kreuz
     # wenn slideUpMenu offen dann auf website nicht scrollbar nur  slideupmenu scrollbar
     # click auf jeweilige kategorien die slides von unten rauskommen
     # sideSlideSpeicher.html code wieder einfügen
     # Filtermenu.js name umändern
     # menuListeners array auch umändern name
     # accountSlide kreuz gröser machen und mehr nach links zentrieren
     # bei click, soll filtermenu in dom einfügen, und bei kreuz click in filtermenu wieder aus dom entfernen
     # alle einzelnen Slides designen, eventlistener und relativ postinierung zu standarSlide auskommentieren
     # click standardSlide öffnen
     # stadnarSlide ejweilgie kategorien click die jeweiligen Slides öffnen
     # wenn accountSlide öffnet, website nicht scrollbar machen
     # bei filterSlides auch wenn öffnet grauer overlay website und nicht scrollbar machen
     # wenn filtermenu offen kann nur dadrin scrollen
     # die anderen slides bei button click auch erscheinen
     # den inhalt zentrieren
     # animation das filtermenu von unten nach oben kommt
     # farbe wehchseln,(saturn menu schauen was noch hinzufügen kann)
    # internet design für produktboxen aussuchen und machen
    # bildschirm kleiner machen, schauen ob produkte und filtermenu alles passt
    # wenn bidlschirm kleiner herz in prodouktbox verschiebt sich nach links auf das produktbild(bild und herz wenn window kleiner, soll in box auch nach links verschieben)
    # wie saturn als erste oben werbung vertikale soll kommen, darüber aktuell gesuchte produkt von user
    # in website einbauen schauen ob funktioniert
    # mainPage.js ganze datei anschauen und wo fkt in eventlistener code ist, das in andere datei reinpacken
    # onclick filling wenn produkte hinzufügt das ersetzen mit eventlistener
    # website einfügen die produkte zentrierung bei grose/kleine bildschirmen
    # saturn no products on page, wrm diese meldung
    # scrape über searchbar und scrape über filtermenu submit btn testen obs klappt
    # filterMenu konstanze ganz oben zu define tun und mit grosbuchstaben alles schreiben
    # scrapeReq.js die die nicht zu scrapeReq gehören rausnehmen, neue js datei machen
    # navBar.js Filtermenu,js alle in ein ordner funktionalitäten und mainPage.js nicht da reintun
    # css dateien auch trennen, 3-5 dateien machen, nicht zu viel
    

    # diese startseite in server einbauen, schauen ob suche produkt noch funktioniert
    # anpassen wie filterSlide bei kleineren bildschirm angezeigt werden soll
    # wenn accountslide registrier btn clickt, soll weiterleiten zu registrierSeite
    # saturn schauen wie man sich registriert mit email sendung und das auch machen, die weiteren steps registrierng
    # infos in datenbank speichern neue tabelle mit usern, wenn registrierung abgeschlossen
    # password hashen und in datenbank speichern, nicht richtige password speichern
       
   # wenn user einloggt soll datenbank schauen ob user daten vorhanden sind(sql injection safe machen)
   # wenn registriert und in datebank email bereits vorhanden meldung geben(schauen was für meldung bei saturn kommt)
   # passwort vergessen button machen, wo email gesendet wird(saturn schauen, wie die das machen)
   # wenn angemeldet und auf account button clickt, schauen was bei saturn dann anders ist wenn acccountSlide öffnet und auch so machen
   
   # wenn bildschirm kleinner wird soll filtermenu anpassen
   # navBarGoToContainer wenn btn clickt soll weiterleiten die seiten designen und in seite einabuen
   # menubar wenn wenn auf eins clickt soll weiterleiten, seite designen davon und einbauen
   # menu btn clicken links menu slide öffnen designen, wenn da auf eins clickt soll weiteleiten für alle seite designen
   
   # erst nachdem etwas gesucht wurde oder in menü ein produkt ausgewählt wird, dann erst filterMenu anzeigen lassen
   # startseite wie saturn mit werbung und vorschlägen machen(beliebteste produkte,...)
   # von user cookies lesen und darauf angepasste werbung anzeigen, wenn keine cookies soll es default produkte zeigen
   
   # produktbox desing internet suchen und machen
   # text einfügen in box was zu otto und saturn passt
   # rcihtige text einfügen und font einstellen
   # langsamer drehen 20s 
   # wenn auf eine seite clicked soll auf jeweilige seite weiterleiten
   # andere code test.js entfernen
   # secondLayer
  # wenn bildschirm kleiner wird, soll kleiner werden und verändern
  # linke seite produktfoto mit images badges
  # rechte seite interaktives weitere infos wenn nach unten slidet, blieb bis zum ende link produkt da
  # scrapeProDetails funktionen weitere infos von rechte seite die man braucht scrapen(zb weitere produktempfehlungen)
 # produkt container clicken die seite ausgeben
 # die Infos aus datenbank aufrufen und in html einsetzen in die otto seite
 # schauen ob saturn infos auch in otto seite einfügen kann, wenn nicht anpassen
 # wenn updatingButton clicked soll zur jeweiligen Seite weiterleiten
 # wenn websitefenster verkleinert wird soll sich der Inhalt anpassen,verändern


# views hintergrund task for loop mehrere kommentar wegmachen, sodass es startet
# wenn nur noch 30 weitere produkte, nochmal weitere celery tas für scraping starten

# wenn keine produkte vorhanden und user button clicked, soll loading bis daten in datenbank sind


# views.py code cleaner machen

# scraperS, scraperO die Infos auch parallel scrapen
#main testin wecker nachmittags starten
#scrapeProdDetails für otto und saturn testing datei machen und starten(so machen das alle hintereinander starten)

#testprogramm:
 # wenn eine info fehlt, soll es auch loggen das das fehlt
 # neue datei die jede kategorie durchgeht und für alle produkte scraperO und prodDetailsO aufruft, logging soll auf getrennte Dateien mache 
 # testprogramm für otto produkte welches alle kategorien durchgeht und jedes produkt bis zum ende scrapen soll. bei fehler soll es loggen und weitermachen.
 # nach 100 produkten soll es 5min pause machen und dann weiter

# debugging in vscode youtube video schauen und anwenden bei nächste debug

# scrapeSaturnDetails testing starten


# otto saturn mainSaturnTesting beides in activeScraper reintun und zu MainTesting.py umbenenen
#prepareO und scraperOtto bei fehlern soll auch in log Datei reinschreiben






# wenn marken eingibt oder zb 'küche' bei saturn kommen keine produkte. da soll dann zufällig eine kategorie auswählen damit produkte anzeigt




# schauen was noch parallelisierbar ist im code scraper,(chatgpt fragen)


# folder structure verbessern
#preparescraping timeout zurückstellen

#website.js z.1264 entfernen
#(submit button entfernen)wenn filterMenu filter auswählt, soll unten kein submit button sein, sondern nur bei searchbar wenn man produkt eingibt kann man suche beginnen

# FilterMenu Slide blaue farbe umändern



 
# scrapeProdDetails.py :
#video auch scrapen falls vorhanden
#weitere Infos die man wichtig sind schauen und scrapen
#scrapeProdDetails in scraperO einbauen als celery tasks, datenbank neue tabelle mit produktdetails erstellen, da soll als key wert das (i) von scraperO haben, damit wenn user auf produktbox clickt, aus datenbank dieses produkt rausgenomemn wird
# produktseite otto design nachmachen mit kommentar funktion, kommentare in datenbank speichern zu diesem produkt
# wenn auf produktbox clickt soll produktinfos mit dieser seite anzeigen

# für saturn auch scrapeProdDetails.py machen celery tasks, ergebnisse datenbank speichern
# produktSeite design(auch kommentare zum produkt speichern)
# testen wenn produktbox click, das produktSeite mit produktInfos kommt


# design von einem produkt Seite, wenn warenkorb clicked soll in warenkorb hinzufügen, es soll die ausgewählten produkt-varianten dabei mitbeachten
# wenn über zb verschiedene farben produkt scrollt soll bild produkt verändern


# wenn website uaf produkt clicked, soll diese website kommen

#website wenn produktbexchreibung text zu lang mehr anzeigen toggel button wie otto


#wenn user website verlästt, soll alle Daten aus Datenbank die wegen dem User drin sind, löschen
#scraper machen, als celery tasks in tasks.py, in scraper_otto diese tasks anwenden
#scrapeProdDetailsOtto produktUrl gehen und die weiteren Infos scrapen und diese in Datenbank weitere tabelle speichern
#bei scraper_otto diese celery hitnergrund start
#weitere tabelle adtenbank mit produktInfos machen und da die produkte speichern mit etnsprechende produktLink. wenn user auf websire produkt clickt in dieser tabelle mit produktLink nach diesen Infos suchen
#sterne,produktname.. soll es von scraper_otto die infos nehmen und nochmal anzeigen
#diese seite html mit den infos designen(otto diese Seite nachmachen)





#das untere auch für saturn machen
#saturn weitere produkt scraper, der produktlink geht und weitere produktinfos scrapt, bei scraper_saturn diese celery hitnergrund starten
#weitere tabelle adtenbank mit produktInfos machen und da die produkte speichern mit etnsprechende produktLink. wenn user auf websire produkt clickt in dieser tabelle mit produktLink nach diesen Infos suchen
#wenn auf produktbox clickt neue seite öffnen mit diesen Infos, wie otto page designen

# preise slide thumbslider gibts paar probleme die finden und verbessern

#program schreiben in welchem mehrere verschiedene produkte scrapt, immer auf weitere produkte clickt und weiter scrapt und es soll immer wenn fehler meldung kommt das speichern


#wenn ein task abbricht, sollen die anderen trotzdem weitermachen


#datenbank main delete() all entfernen
#caching gesrapte produkte in datenbank lassen, falls user wieder nach diesen sucht. maximal 1 tag, ab da caching wegmachen, weil scraper sollen aktuellste produkte scrapen



# einbauen das website auf mehreren sprachen gibt, deutsch,englisch,..
#wenn mehrere scraping funktionen pro scraping 12 produkte anzeigen (danach immer button 12 weitere produkte anzeigen) anstatt 6 stück jedesmal nur anzuzeigen
#saturn scraper soll auch maximum ProduktAnzahl finden und wie otto, wenn startpoint über Maximum ist, soll es res:[] geben und aus activeScraper löschen
#(erst machen wenn saturn und otto gemeinsam scrapt)maximum ProduktAnzahl(12 von 323) das soll verändern. In prodCountMax reinschreiben. Alle Maximalen Produktanzahlen von jedem Markt addieren und reinschreiben
#wenn button geclicked wird loading button animation, bis produkte da sind
#bei button etnfernen mit transition und ladebalken wie saturn bis die produtke eingefügt werden
#saturn und otto scraper gleichzeitig starten und das machen

#wenn otto aufhört zu scrapt, soll sich die seite schliesen und cnicht unnötig offen bleiben
#bei normale scraper ab 1778 scrapen und schauen, hintergrundtask fehler finden
#view z.43-48 in for loop mit 4er schritten machen
#geht scraper auch bei 200 startpoint( schauen ob formatNumber fkt dadurch scraper nicht funktioniert)
#bei hintergrundtasks worker ist page None, warum
#scraper geht nicht fehler finden
#nach objekt zugriff wenn zu lange soll ignorieren und weiter scrapen

#nur erte suche views startScraper, bei infinite scrolling soll andere view funktion erstellen
#call_celery_tasks speichert wert in datenbank tabelle, async scraper darauf zugreifen und prüfen ob startpoint über maxProduct ist, dann abbrechen. wenn Wert in datenbank noch nicht vorhanden, darf scraper weiter scrapen
#testen einmal, ob bei 100 produkt hintergrundtasks aufhören zu scrapen
#wenn neue produkt gescrapt soll maxOtto Wert überschreiben
#tasks.py machen funktion get otto..
#für scrollbalken runter und nochmal produkte srapen, soll andere view funktion statt startScraper machen
#bei otto max produkt zahl herausfinder fkt, soll celery hintergrund task machen und ergebnis abspeichern für otto. in async_scraper daruf zugreifen, falls startpoint gröser, soll otto 'Ende erreicht' zurückgeben
#bei saturn auch auf ende reagieren
#preise filter style geändert wrm
#in view funktion machen, die märkte von user ausliest und dementsprechend die jeweiligen funktionen aufruft
#next button vorherige element locaten und darauf clicken.dann auf letzte seite, letzte element data-qa zahl finden und mit startpoint vergleiche. diese max finden, soll nureinmal aufrufen, nicht jedesmal beim scrapen
#z.553-556 nach oben zu parallele task fkt machen z.262. z.273-330 auch da reintun
#wenn startpoint zu hoch ist oder wenn auf einer seite scrapt und overflowpage öffnet, soll es ende produkte erkennen und nur diese markt Scraper beenden und (keine Produkte mehr) zurückgeben
#otto wenn keine produkte mehr soll keine Porudkte mehr zurückgeben 
#jedesmal beim scrollen soll tasks moreScraping aufrufen
#bei saturn dasselbe wie oben machen
#mehr parallel ausführen anstatt synchron
#wenn ein task nicht klappt fehler, soll andere trotzdem zurückgeben(mache bei einem locator extra fehler)
#otto scraper mehrere startpointe prüfen, ob es richtig scrapt
#kommentare async_scraper auskommentieren
#scraping zahl von 4 auf 10 erhöhen
#z.500-544 code chatgpt soll cleaner machen,in mehrere kleine funktionen unterteilen inhaltlich
#async_scraper z.513 soll dann zahl von 1 anfangen
#nächste page aufrufen wenn nötig
#ende der produkte erkennen und bei scraper soll zurückgeben, dass für diese suche keine weiteren produkte mehr vorhanden
#nicht von ähnlichen artikeln scrapen
#otto nächste page clicken wenn geht und weiter scrapen
#für otto auch page.goto(..) machen und overflowpage wie für saturn dasselbe machen
#overflowSaturn page prüfen ob erreichba, fehler..

#saturn,otto ende der produkte erkennen, wenn es keine produkte mehr gibt wenn Startpoint zu hoch ist, keine Produkte mehr zurückgeben zur website
#ab startpoint produkte scrapen, vorherige soll es ignorieren,erst bei saturn dann bei otto
#asyn_scraper startpoint 11, aber es scrapt trotzdem vorherige produkte



#was wenn startpoint kurz vor ende auswählt
#asyn_scraper z.376-382 korrigieren, was wenn ab 11produkt anfängt aber nur 2 auf diese page(dann soll automatrisch auf weitere produkte anzeigen clicken)
#bei saturn,bei startpoint. immer nach 12er reihe, soll page 1 erhöhen. 1-12 page=1, ab 13 page=2
#wenn ein startpoint angibt, soll scraper direkt von da anfangen zu scrapen
#bei saturn , wenn mehr anzeigen button sieht soll drauf clicken
#wenn startpoint mehr als 12 produkte soll es an url page=2,page=3... anhängen
#bei otto soll wenn startpoint gegeben direkt zum produkt scrollen
#async_scraper timeForScraper 2222 gemacht
#asyn_scraper z.264 browser und scraper starten kommentar wegmachen
#scraper paar startpoints aussuchen und mit screenshot überprüfen, ob scraper von diesem punkt aus die weiteren 4 produtke scrapt(es muss nicht in reihenfolge scrapen,hauptsache die nächsten 4 ab diesem punkt)
#bei ott auch paar tests machen ob es richtig macht

#bei jede weitere 12produkte anzeigen, soll nochmal weitere produkte scrapen
#bei views wenn moreScraping aufruft, soll mehrere davon parallel aufrufen, sodass direkt die nächsten 25produkte in datenbank schon hat.
#also erste scraper ab 4 produkt bis 8, zweite scraper 9 bis 13... (bei saturn nach 12 produkten immer page=2 machen). bei otto schauen wie da machen musst
#wenn user scrollt soll von datenbank weitere produkte einfügen in website. nahc ca.16 produkte wie bei Saturn mehr produkte anzeigen button. wenn drauf clicked, soll weitere produtke aus datenbank einfügen
#direkt auch parallel die scraper starten,welche die produkt details scrapen

#pop up Menu wenn man herz clicked. zur Wunschliste clicken, soll dann wunschliste seite öffnen
#favoriten produkte des users in datenbank speichern und bei nächste besuch anzeigen

#nach 8 produkten Button machen, 8 weitere produkte anzeigen, wie bei SAturn und zwishcendurch soll grose block personalisierte werbung sein
#warenkorb button machen, neue veränderung django übertragen (div und klasse in test.css)
#für jede produkt scraping in datenbank, produktart angeben, falls user dasselbe sucht, dann ausdatenbank rausnehmen und nicht nochmal scrapen 
#tasks.py soll Scraper(scraper muss auf seiten wechsel reagieren können, also weitere produkte button clicken) unendlich lang scrapen, bis keine Produkte mehr vorhanden sind oder user seite verlästt,andere produkt sucht.
#task erstellen in task.py,welches 4 produkte scrapt und in datenbank reinschreibt. das in view startScraping aufrufen(mit produktName und filtern von user).
#bei scrolling website, soll von datenbank datei lesen
#wenn noch keine weiteren Scraping Daten bei scrollen ist, soll loadingbalken erscheinen
#scraper celery starten und in datenbank speichern
#bei produktboxen steht UVP None
#die einzelnen produkte deren details scraping dafür mehrere parallele worker machen, diese daten in datenbank speichern


#produktvergleich wie bei otto machen
#kleine herz wenn drauf clicked, wird produkt zu favoriten hinzugefügt, das noch machen
#bei chrome website 2 produkte, aber bei edge browser 1 produkt(weil fenster kleiner werden kann)
#celery in django integrieren yotube schauen (einstellungen muss etwas eingeben)
#settings.py celery_results_backend ganz unzen ändern zu datenbank
#ausführen celery in view startscraper
#die ergebnisse in datenbnak speichern
#celery fkt machen und kommunizieren damit
#celery starten. 4produkte scrapen und in datenbank speichern
#hintergrundtasks machen, bei denen mehrere seiten eines produkts scrapt und datenbank speichert,damit infinite scrolling schneller geht
#user scrollt, dann datenbank auf produkt zugreifen
#startScraper view soll nur 4 produkte scrapen. und ergebnis zurückgeben. dabei startes es mit celery hintergrundtask (asyn_scraper). dieser speichert ergebnisse in datenbank und bei scrollen von user, wird anfrage an datenbank gesendet 
#produkte dann website anzeigen
#filtermenu anfrage schicken, das auch so machen, dass es klappt mit  produkteAnnehmen(request) in view
#startScraper startet scraper
#produkteAnnehmen verarbeitet die Antworten

# darkmode design website einfügen, das man es auswählen kann
#async scraper loop unendlich gehen
 
#result an start scraper schicken
#start scraper veändern, sodass darauf reagiert
#am Ende 2 situationen.entweder button clicken für weitere produkte oder keine Produkte mehr vorhanden. diese beiden Fälle erkennen

#wie funktioniert csrf token
#scraper nach jede 4 produkte schickt an backend und das fügt in website ein und in datenbank ein (caching)
#für infinite scrolling
#scraper scrapt einmal, danach bleiben websiten offen und scraper scrapt weitere produkte und schickt diese an backend.wenn user scrollt sollen diese angezeigt werden.wenn andre produkt sucht, soll aktuelle löschen und neu starten
#caching. gescrapte produkte in datrenbank speichern, solange user auf website ist. wenn user mehrmals gleiche suche macht, soll datenbank auf produkte zugreifen  


#scraper while schliefe zu allen produkten scrollen und warten zum laden, und weitere produkte buttons clicken die ganze zeit.

#nach scraping offen bleiben websiten nicht schliesen und schonmal durch ganze website durchscrollen und alle buttons für weitere prdoukte clicken damit es schonmal lädt
#die weiteren produkte sollen gescrapt werden




#infinite scrolling bei jede scrolling soll weitere produkte scraping. bei scraper soll die märkte websiten offen bleiben, sodass nicht bei jedesmal scraping nochmal öffnet
#wenn eine suche gemaacht, die ganzen websiten bleiben offen, bis neue suche oder verlässt website
#neben infinite scrolling, soll es schonmal die produktdetails der produkte scrapen(produkte link clicken und scrapen) und schonmal speichern
#wenn auf produkt clicked, soll weitere website mit nur dem produkt inhalten kommen,so wie otto wenn man auf produkt clicked



#wenn website fenster kleiner wird, sollen produkte smooth kleiner werden(wie bei otto). es wird aber aufienmal kleiner

#wenn 0 Artiekl keine Ergebnisse gefunden, soll es in cookies schauen, welche produkte er sich am meisten anschaut und darüber scraping machen und diese produkte anzeigen
#erstmal selber cookies manuell setzen zum testen, später wenn user auf produkte clicked, werden in cookies automatisch reingeschrieben und gespiechert

#bei dieser url die richtige url encoded speichern, wenn man daraug zugreifen muss


#loadingbalken als kreis machen

#url soll direkt schon leserlich sein

#wenn makrenmenu scraping start soll marken auch in url anzeigen
#bei startScraping soll es filter attribut nur ersetzen, falls vorhanden

# js z.1346 timeout False machen
#wenn errorBox hinzufügt, soll wie bei web academy  error poup using htmlm ganze bidlschirm grauer werden

#otto wegmachen und nur saturn schauen, ob scraping mit filtern klappt.alle filter auswählen und url nehmen und selber draufgehen um filter zu überprüfen
#filterMenu alle machen
#saturn preis scraping fehlt € zeichen

#für kleinere bidlschirm anpassen die fehlermeldung timeout


#timeout asyn_scraper z.496 wieder 500 machen

#async_scraper z.514 was das:  task.result()!=None] #einmal 'Ende' von scraper eingefügt.danach nur None. diese sollen entfernt werden

#views.py z.32 wenn [] ist wird das zurückgegeben . js z.1347 soll das einfügen(filter marken alle auswählen beidem bei beiden märkten noRes ausgegeben werden muss)
#wenn results Liste mit produkten leer ist soll keineProdukte.html anzeigen

#(für mehrere window grösen, schauen und einstellen)kleinen bildschirmen  produkt boxen besser platzieren, wenn platz reicht 2,3 nebeneinander.wenn gar nicht geht nur 1 pro reihe untereinander alle
#wenn noResults dann soll nur einmal das ausgeben




#asyn_scraper.py z.482 auf 10 sekunden max machen
#produktboxen warenkorb design verändern(das mit herz grose)
#wenn auf produktbox clicked soll es neue Seite laden. das mehr infos zum produkt zeigt.
# scraper machen das auf produktlink geht (bei async_scraper ist das schon gescrapt von da den link nehmen) und weiter scrapen

#searchbar erneuern mit loadingbalken wenn produkt sucht
#filter auswählen und prüfen ob zu richtige url geht
#js z.1250-1254 kommentar wegmachenund benutzen. dadrunter produkt="ipad" wegmachen


#scraper überspringt produkte, wie testen
#produkte boxen design verbessern
#normale scraping sollen produkte richtig platziert werden nicht übereinander
#bei kleine bildschirm auch richtig platzieren

#bei otto preis filter auswählen boxen click und scraper soll dann mit diesem filter starten
#für alle filter machen
# für saturn auch machen

#infinite scrolling verbessern, einmal scraper gestarte soll es die ganze zeit scrapen und einfügen die produkte

#1247 es soll fehlermeldung ausgeben, wenn kein produkt ausgewählt
#marken anfangen wie bei otto
#bei marke nichts gefunden, wie bei otto machen

#markt kopie clicken funktion löschen komplett?
#bei märkte dasselbe wie oben machen

#lialbox kopie boxen code entfernen



#ausgewähltebox bei showMoreText gröse unnötig verändert
#wenn alle marken toggle ganz oben meineMärkte, dann gehen boxen über das Menu
#markenzähler aktualisieren
#bei marken:liste javascript aktualisieren mit alleMarken.py


#alleMarken.py für tablets weitere hinzufügen
#ordner mit allen SlideMenus machen und tablet SlideMenu hinzufügen
#die marken in slide menu einsetzen von otto und saturn alle chatgpt sagen es soll die boxen erstellen
#die namen bei filtern prüfen keys ob richtig

#z.51 filterOttoUrl funktion die restlichen filter von z.39 noch machen
#bei otto auch filterOttoUrl machen
#z.197-198 kommentar wegmachen und 434-437 auch kommentar wegmachen

#filterUrl funktion bei marken filter mehrere verschiedene, je nachdem was für ein filterMenu
#prüfe ob wenn alle filter auswählen und submit click, ob dann in filterSaturn/OttoUrl funktion in dics die gleichen key strings sind
#wenn filterDic leer normale suche, wenn nicht mit filter suche

#bei eingabe: 'tablet' soll marken filter in slidemenu sein. bei ipad aber nicht
# z.403 zu 8 machen und am anfang filterDic kommentar wegmachen z.56-60
#filterUrl funktion nur für urlStructur="brand" gemacht, aucah für andere machen
#wenn filterDic leer ganz normal scrpaen, wenn nicht mit filter scrapen
#diese drei für alle filter machen
#bei saturn preise gibt es maximale spanne die man nicht überschreiten kann, bei filterSLidemenu das anpassen je nach markt,produkt
#value bei filterDic das von website geendet wird , mussen die strings bei scraper genau gleich sein
#saturn ohne filter und mit filter unterschieden. bei ott auch
#ab z.64 mehrere page.route, weniger machen
#ohne filter scraping : z.94-120 durch ein url page.goto("https://www.saturn.de/de/search.html?query={user_input}") ersetzen

#für verschieden produkte, verschieden slidemenus und filter Marken soll auch verschieden Marken haben

#bei verschiedenen eingaben verschieden FilterSlidemenus anzeigen, dictionary mit wörtern bei denen bestimmte slidemenu gesendet wird
#preis angeben filter, scraper mit diesen preisen starten
#bei saturn &currentprice={anfang}-{ende}&sort=currentprice+asc solche url anhängen
#bewertungen wie speicherKap checkbox machen mit hover und shadow
#wenn nciht leer filter einstellen, bei otto alle filter url strukturen anschauen und bei ausgewählten filtern jeweils diese url einsetzen

#wenn saturn marken namen wie samsung eingibt, soll scraper random eine kategorie clicken und scrapen

#produkt und filter anfrage schicken,wenn filter vorhanden mit filter scraping, wenn keins dann ohne filter scraping
#filtermenu soll nur anzeigen wenn man ein produkt eingegeben hat
#nachdem produkt eingegeben, soll es merken und wenn filtermenu benutzt darauf filter anwenden
#scraper auf parameter reagieren
#erstmal preise scraper steuern
#und alle anderen auch
#website x achse scrollbalken wegmachen,weil man kann nach rechts zu den versteckten menus sliden
#nachdem submit button geclicked, geht SlideMenu nicht mehr auf

#wenn sonderzeichen eingabe bei searchbar, soll es entfernen und schauen ob gültige eingabe ist
#filter auswählen 2 wege. entweder erstmal ein produkt suchen ohne filter. und dann wird filter menu angezueigt. oder direkt in navbar produkt mit filter suchen

#wenn searchbar user eingabe gemacht, soll oben stehen die Eingabe vom user "Fahrrad"

'''
 function startScraping() {
        // Beispiel-Parameter, die du an die GET-Anfrage anhängen möchtest
        var parameter1 = 'wert1';
        var parameter2 = 'wert2';

        // URL mit Parametern
        var url = "{% url 'meine_view' %}?param1=" + parameter1 + "&param2=" + parameter2;

        // Senden der GET-Anfrage mit den Parametern
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())  // Wir erwarten eine JSON-Antwort
        .then(data => {
            console.log('Erfolgreich:', data);
            // Hier kannst du den Erfolg weiter verarbeiten
        })
        .catch((error) => {
            console.error('Fehler:', error);
        });
    }
</script>
'''
#z.131 startScraping() in dieser funktion soll get anfrage schicken und als parameter alle filter angeben
#preise input zwei preise angeben und submit button drücken und scraper startet. 
#wenn keine Sucheingabe und filter wird ausgewählt, dann soll fehlermeldung ausgeben
#erstmal preise slide filter auswählen und submit button clicken und scraping starten


#z.20 in märkte variable steht drin, welche scraper für welche markt gestartet werden soll

#wenn ipad eingibt, geht es dann direkt mit einem link zur website
#in urlsSaturn arry noch mehr Urlstrutkuren reintun(in funktion mit case machen )
#danach soll diese url verwenden
#ansonsten default weg

#bewertungen slide dasselbe
#filter dasselbe
#alle filter auswählbar

#website produkte boxen design verbessern,wenn neue produkte hinzugefügt werden von scraper, nichts verschieben
#navbar, searchbar umändern
#bei kleine bildschirm wenn filter opening button drückt und menu märkte öffnet, dann ist es unter dem Slide

#website in index.html kopieren und design umändern


#tabletspezifische:Betriebssytem, Arbeitsspeicher,Prozessor-Taktfrequenz,Farbe,Rückkamera

#wenn produkt gesucht wird, dann sol scraper die ganze zeit scrapen bis es keine produkte mehr gibt und nicht erst wenn der user nach unten scrollt scraper starten
#wenn auf filter clicked, soll direkt webscraping starten
#bei sumbit click soll menu schliesen und loadingbalken in mitte auftauchen
#für das obere märkte und marken menü zur hälfte verkleinern
#wenn menü öffnet soll animation und website soll kleiner werden, sodass das menü nicht über den produkten ist, wie bei Apple smoothe animation
#Alle löschen um alle filter zurückzusetzen
#wie apple suchleiste oben und es soll wenn drauf click animation nach unten
#wie bei idealo beliebteste Kategorien, beliebteste Produkte anzeigen
#ganz oben Werbung anzeigen personalisierte. wenn User sich produkte anschaut soll tracken welche produkte angeschaut hat und cookie user mitgeben. jedesmal wenn user website öffnet soll cookie anschauen und danach produkteWerbung anzeigen


# a bis Z märkte width kleiner + wenn später sehr viele märkte boxen soll da scrollbar sein
#top right corner kreuz um komplett zu entfernen SlideMenu
#bei kleinen bildschirmen soll sich inhalt der website anpassen auch gut aussehen machen
#wenn auf button click blaue umrandung, das entfernen
#andere websites anschauen und gute Sachen notieren für eigene Website
#über filterBox art des filter soll stehen : Preis;Bewertung,Märkte;Marken...
#wenn website auf produktbox hover, dann soll, wie mediamarkt leichte schatten bei produktbox sein
#kommas. <i> soll pos absolute rechts box
#toggle btn click und entclicken bleibt trotzdem eine box
#wenn auf trashcan click, dann wird märkteChoosen nicht gelöscht
#komma zwischen märkte namen, kleinere schrift
#OutsideClickHandling funktion zsmfassen,verbessern
#js z.626-656 anschauen, verbessern
#märkte menu. wenn märkte zähler gröer null, soll von allen tags die inneren texte als box hinzufügen
#wenn mehr als 3 soll es Saturn,Media-Markt,Amanzon & 12weitere Märkte..
#märkte ausgewählz soll unten box so aussehen:  Saturn,Media-Markt,Amanzon & 12weitere Märkte..
#ChoosenFilter kreuz entfernen können
#filter menu soll nicht direkt schliesen,weil ansonsten wird bei menu click documetn event listener nicht entfernt. mache mit radio input type wie bei bewertungen
#js z.50-58
#chatgpt fragen ob es besser geht sntatt mehrere if elif bedingungen
#wenn filter,märkte,preis.. ausgewählt, soll es unten als Boxen anzeigen was der User ausgewählt hat
#Alle filter löschen machen wie bei saturn wenn man filter auswählt(soll anzahl filter angeben)-> Alle löschen(1) in rote Farbe
#search bar märkteSuchen text geht nicht runter

#wenn Märkte box searchbar clickt, dann mehrere eventlistener die nicht entfernt werden
#Marken Filter von saturn machen
#otto filter für ipad(auch wie die anderen buttons kleine menü öffnet sich), alle machen:Preise filter,marken,filter,speicherkapazität...
#filter menü für ipad einbauen und web scraper die infos schicken, die es verarbeitet
#preise auswählen und an backend scraper schicken
#entdecken button menü soll weiß sein und nicht grau
#wenn auf preis button click, wird bei entdecken-/märkte button display:none hinzugefügt
#entdecken button menü bisschen abstand zu obige btn wenn es angezeigt wird
#standart filter: farben nach oben erste reihe
#spezifische filter zweite reihe
#alle menus solen gleiche abstand zu obige button haben und gleiche border-radius


#js datei umsortieren alle functionen oben, menus alle zsm...
#ganz am Ende button, Filter anwenden, wo alle Filter bestätigt und angewendet werden
#wenn 0 und bis input nichts eingibt ist bei lücke bissl grau zu sehen
#wenn von 0 eingitb und bis 100 progressbar farbe nach links verschoben
#range slider wenn zuschnell geht farbe drüber
#Input kann alles eingeben, aber wenn gröser als max kleiner als min, bei click auserhalb input soll es auf max oder min einstellen
#wenn bei thumb aufeinander,kann man keins bewegen
#wenn org box anklcik ptag ersteller ist dataremove-id anders als wenn kopie boxen lil box drückt, da ist dann "kopie" im wort drin
#ptag classenname saturn stattdessen data-name='saturn'


#alle style display stattdessen bootstrap klasse d-block d-none machen
#alle märkte boxen data-name=saturn machen anstatt das in classe einzugeben, dafür auch java umändern auf data-name zugreifen
#wenn name zu lang ist für meine märkte box, dann box vergrösern
#märkte button verschieben
#alle checkboxen sollen ein value haben mit dem markt name , damit scraper weis welche markt scrapen soll
#wenn entclicken boxen, soll aus meine märkte entfernen
#boxen nicht mit häckchen, sondern mit entfernen kreuz
#suchvorschläge boxen id for ändern
#acceskeys für interaktive elemente einfügen
#wenn hinzufügt zu meine märkte classe for ändern nach clonenode
# meine märkte erstmal kleine box, nur maximal 4 märkte box anzeigen, danach... und alle anzeigen button um box zu vergrösern und alle zusehen
#wenn hinzufügt, soll auch counter über box gröser werden
#counter in ausgewählte box ansatt über button
#wenn auf ein markt click soll es dahin verschieben
#alle suchergebnisse in ein div tag und bei jeder suche(märkte_ergebnisse),mit ergebnissen ersetzen
#nach gesuchte box vorhanden, search wird inhalt suche nicht entfernt bei enter
#wrm checkbox if prüfen bevor man checekbox.checked macht, obwohl alle selektoren richtig sind
#wenn auf lupe clicked oder enter taste, dann soll suche box sichtbare werden und die ergebnisse anzeigen, anzahl der märkte bei suche auch anzeigen
#wenn eins auswählt soll es zu obige ausgewählte märkte box verschieben, bei ausgewählte märkte box nur mit kreuz, um es zu entfernen
#user eingabe oben anzeigen gesuchte märkte.daneben anzahl der märkte die gefunden wurden anzeigen
#nach enter sollen die gefundenen märkte in die box einfügen
#color combiantionen für märkte menu schauen
#wenn markt suchen, soll ganz oben wie bei otto suche von user stehen und dadrunter die märkte buttons,wenn click, soll in ausgewählte oben gehen
#ausgewählte menü oben soll immer dasein , wenn nicht soll 0 ausgewählt stehen
#menü ganz oben ausgewählt bereich.sollen alle ausgewählten sein,diese boxen sollen kreuz für entfernen haben
#wenn seaarch bar
#gesuchte märkte märkte filter hover bei kreuz oben rehcts
#nach eingabe, wenn keine eingabe soll search-bar wieder alte gröse annehmen
#seacrh bar ausgangsheight kleiner machen
#search bar durchgestrichene linie dadrunter
#wrm bei saturn kommt danach ein Komma,bei scuhvorschläge sollen die button dadrunter nicht über suchvorschläge box sein
#meistgesuchte Märkte dadrunter mit meistgesuchtesten Märkten einfügen(normal als box), mit trend icon daneben
#the tech team auto complete search video


#php und sql lernen und cookies bei jede user welche produkte er sich anschaut mit php in datenbank speichern
#in suchleiste wenn markt eingibt,soll alle anderen boxen weg und nur das was user eingegeben hat anzeigen
#märkte liste mehrere nach abc sortieren,damit user schneller finden kann,gröser machen anzeige
#searchbar hauptseite autocomplete auch machen
#autocomplete search_bar nur mit den märkten die es zur auswahl gibt
#meü nur saturn otto machen und von menü aus auswählen saturn oder otto und so soll scraper starten
#preis auswählen filter,designs schauen
#wenn toggle button click, soll backend alle-wert schicken
#ohne submit drück alle eingben weg asuerhlab menü click mit submit click bleibt es so und anfrage an backend schicken Home() funktion
#wenn submit button drückt, soll alle checkboxen backend schicken, jede checkbox value anpassen,damit backend weis, welche scraper starten soll
#images neben märkte namen
#alle märkte auswählen button.dann soll im Menü die Produkte alle automatisch ankreuzen
#(markt vorschläge)wenn eingabe eingibt user, soll markt direkt anzeigen in menü,suchleiste
#(filter-menu galerie)die ersten 4 märkte unter dem Button anzeigen, die restlichen button machen mit (alle anzeigen, wenn drauf drückst, soll pop up mit allen Märkten)
#bei Menü sollen die Märkte Symbole rechts vom Text anzeigen und bei popo up auch
#für mehrere buttosn die pfeile menüs di sich schliesen wenn auserhalb menü button drückt bedingungen erweitern
#märkte menu gröser machen sodass man 30märkte aufeinmal sieht
#wenn search bar drückst,soll nicht schliesen enü
#märkte auswählen erste zwei zeigen, die anderen...,menü mit scrollbalken, wenn drauf clickt, wird kleine box unter dem gezeigt mit markt. für restlichen button wo drauf drückst pop up mit weiteren märkten anzeigen
#wenn andere button clickt und menüs offen sind, sollen die schliesen
#button nebeinander nicht aauf gleicher Höhe?

#(galerie filter-menu)filter-menü oben horizontal.(märkte auswählen,marke,farbe,preis, alle anderen filter zu tecnik produkten schauen) erst nicht anzeigen. nur kleine button mit "show filters". wenn drauf drückt wird es anzeigen.navbar wird nach unten klappen
#filter-menü suchleiste mit märkten die man ausählen kann(jetzt nur otto und saturn machen)
#je nach kategorie soll andere filtermenü anzeigen
#bei otto kann man nächste seite gehe. wenn keine produkte merh soll es oben auf next page clicken scraper. wenn bei letzte seite angekommen, soll es aufhören
#wenn ein scraper aufggehört hat, soll es bei website das dem user sagen("keine Produkte merh von saturn vorhanden")
#wenn suchleiste schreibst, soll wie bei idealo, alles dunkler werden und produkte vorschlagen
#DURCHLESEN: 1.für saturn 2.für otto -->bei jede produkt scrapen, wie viele produkte es gibt und wenn zb 210.wenn beim scrapen 209 eingegebne wird, soll nach letzte produkt.("Keine Produkte mehr") in Tupel geben und scraping abbrechen.bei django template, soll das dasnn unten anzeigen.
#loadingbalken neben scuhleiste kurz, danach auf website
#suchleiste produkt vorschläge beim schreiben
#otto markennamen nicht als produkt titel, sondern dadrüber
#scraper schneller machen
#cookies. wenn user ipad gesucht.bei nächste website besuch auf startseite Produktempfehlungen das anzeigen.
#€ zeichen bei saturn produkten fehlt
#wenn eine website unavailable,soll kleine nachricht user sagen, dass es bei der webiste fehler gab
#paar produkte übersprüngen, warum werden die übersprungen
#otto website, ganz unten werden ähnliche produkte angezeigt. bei denen aufhören zu scrapen
# infinite scrolling otto page, jedesmal wie runterscrollen, sodass die weiteren produkte laden
#3 produkte aufeinmal zeigen, damit man schneller produkte anzeigt, otto inspirireren, fitermenü links, werbung rechts
#web scraper wenn produkte nicht merh auf der ersten seite, soll es auf dei zweite seite und da scrapen
#infinite scrolling, soll weitere produkte scrapen für die nächsten 10 produkte. wenn locator nicht vorhanden, soll es auf nächste seite und es scrapen
#suchleiste loading balke, nach kurzer zeit soll dann bei seite loading balken
#suchleiste produkt eingabe, sollen Produkte vorgeschlagen werden
#bei search-bar shadow machen django
#Filter Menü ändern
#nach preis absteigend und bewertungen sortieren kann suer auswälen
# otto bilder werden nicht angezeigt, wait for timeout so gering wie mögich machen, die bildlinks werden gescrapt, fehler django template?
# beide scraper django testen, ob klappt,
# ganz unten seite, soll button (nächste seite). wenn drauf drückst, werden die weiteren produkte gescrapt(fängt von da auf , wo es letzte mal scraping aufgehört hat)
# wenn man nach produkt sucht, soll wie bei mediamarkt neben suchbalken loading und nach kurzer zeit, soll unte  seite ladebalken sein
# bei suchleiste wenn produkt eingitb, automatisch produkt vorschläge anzeigen

# für jede scraper  am ende markt name abkürzung, damit nicht ausvershene auf variablen von anderen scrapern zugreift

#fehlerbehandlung für jede locator,falls auf ein locator zu lange gewartet wurde,soll None geben und bei django template, wenn==None, soll schreiben Fehler aufgetreten bei zb Produkt-Name
#ein produkt finden was nicht verfügbar ist, wo keine preise usw. sind, diese erkennen und dementpsrechen kein preis anzeigen
#link locator andere locator versuchen
#taskgroup exception handling machen,falls ein locator oderso nciht gefunden, soll es andere produkte trotzdem anzeigen
# saturn_scraper. es soll keine Nones kommen bei produkte_scraping.in scrap.py nur saturn scraper reintun.(einmal 10000s warten,schauen ob es nur am warten liegt) durch was wird der None erzeugt? warenkorb count wegmachen un schaiuen welche locator probleme macht
#was ist couroutine?,eventloop verstehen(javascript event loop--visualized)
#asyncio in python-Full tutorial tech with tim
#alle daten erstmal parallel scrapen und am ende verarbeiten. alle produkt container gleichzeitig scrapen daten
#playwright,async,await machen,extra datei nur ein scraper (otto_scraper und dann das parallel laufen lassen . am ende for loop soll es warten bis alle ergebnise da und dann nächste for loop starten). das mit saturn_scraper auch machen und beides zsm in eine funktion. da auch bei de for loops sollen parallel laufen und am ende soll preis sortieren auf beide ergebnisse warten
#website ipad eingabe gibt produkte nicht wenn for loop bei funktion bis 5 geht. bis 2 geht aber
#scraper parallel starten,(test.py schauen) für jede website eine funktion, diese multiprocessing wie bei outube video multiprocessing python und danahc soll eine letzte funktion ablaufen, die alles nimmt und sortiert und ausgibt. 
#infinite scrolling
#cookies, user verhalten auf meiner website tracken und personalisierte werbug anzeigen. und auf anderen websiten user auch tracken für personaliserte werbung. cookies akzeptieren anfang menü anzeigen
#bei kleine bildschirm ist search bar und filter nicht sichtbar
#auf kleine bildschirm produkt container gröser machen
#manchmal bei manchen produkten werden nur 3 sterne angezeigt
#wenn filter-menü muss man nciht unbeding auf filter button drücken um zu schliesen, sondern kann irgendwo anders drauf klicke, um zu schliesen
# wie bei media-markt filter-menü button soll ganz rechts kleine dreieck nach unten zeigen.wenn drauf gedrückt soll es nach oben zeigen
#von... bis... preis forms machen
#filter-menü für ipads machen (mediamarkt für ipad alle filter anschauen und wenn man draufdrückt soll es auch klappen)
#hintergrund website ändern damit kontrast search bar deutlich wird
# wenn filter-menü öffnest, dann scrollbalken und man kann filter runterscrollen
#filter-menü von mediamarkt machen mit bild oben von website
#mehrere bereiche Menü(Elektronik,Kleidung...)
#filter-menüs mehrere arten, wenn user nach handy sucht, dann andere filter-menü, wenn nach kaffemaschine sucht,andere filter-menü

#wenn filter-menü offen und kleine bildscirm obere navbar öffnet, soll filter-menü schliesen
#button draufdrücken, alle filter arten anzeigen. dann nochmal draufdrücken um filter auszuwählen. erstes preis von bis filter machen
#otto ,saturn bei beiden for schleifen verschiedene variablen name machen, weil beides in einer funktion und es kann zu problemen führen
#filter button, drauf drücken und dann wie bei mediamarkt verschiedene filter Arten einbauen
#Preisspanne user kann selber auswählen mit forms, falls keine angabe default value 0 bis 1000
#web scraper soll erstmal nur wenige produkte scrapen und ausgeben damit es schneller ist. es merkt sich wo es aufgehört hat zu scrapen und bei nächste anfrage macht es da weiter
#bottom website nächste seite button
#footer seite ganz unten hinzufügen(websites anschauen, wie du es machen sollst)
#suchleiste designen
#barrierefreiheit für blinde und screenreader website anpassen
#produkte container design erneuern
#icon von website soll es in container haben, je nachdem welche website, (bei tupel link name schauen und je nachdem otto,saturn.. icon oben rechts anzeigen)
#navbar collapse menü bei kleinere bildschirm design verbessern











