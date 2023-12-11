from rest_framework import viewsets, permissions,status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError

from .models import Transaccion
from .models import Usuario

from .serializers import TransaccionSerializer
from .serializers import UsuarioSerializer

# Que consultas se van a poder hacer
class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    permission_classes = [permissions.AllowAny] # Cualquier aplicacion cliente va a poder pedirle datos a mi servidor
    serializer_class = TransaccionSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
     
        
            



