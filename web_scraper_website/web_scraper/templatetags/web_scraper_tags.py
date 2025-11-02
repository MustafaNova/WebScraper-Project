from django import template

register=template.Library()

def name_length_check(value):
    
    if len(value)>122:
        return value[0:122].rsplit(" ",1)[0] + "..."
    return value

register.filter("name_length_check",name_length_check)


def volleSterne(string):
    return range(int(string.split(",")[0]))

def halbeSterne(string):
    return range(int(string.split(",")[1]))

def leereSterne(string):
    return range(int(string.split(",")[2]))

def anzahlSterne(string):
    return int(string.split(",")[3])


register.filter("volleSterne",volleSterne)
register.filter("halbeSterne",halbeSterne)
register.filter("leereSterne",leereSterne)
register.filter("anzahlSterne",anzahlSterne)