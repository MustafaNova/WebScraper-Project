from django.db import models

# Create your models here.
class Todos(models.Model):
    name = models.CharField(default="Default")
    done = models.BooleanField(default=False)