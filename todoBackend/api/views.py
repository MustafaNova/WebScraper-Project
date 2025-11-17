from django.shortcuts import render
from rest_framework import viewsets
from .models import Todos
from .serializers import TaskSerializer



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Todos.objects.all()
    serializer_class = TaskSerializer


