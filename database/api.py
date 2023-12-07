from rest_framework import viewsets, permissions

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
    permission_classes = [permissions.AllowAny] # Cualquier aplicacion cliente va a poder pedirle datos a mi servidor
    serializer_class = UsuarioSerializer

