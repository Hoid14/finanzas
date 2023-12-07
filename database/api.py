from .models import Transaccion
from rest_framework import viewsets, permissions
from .serializers import TransaccionSerializer

# Que consultas se van a poder hacer
class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    permission_classes = [permissions.AllowAny] # Cualquier aplicacion cliente va a poder pedirle datos a mi servidor
    serializer_class = TransaccionSerializer
