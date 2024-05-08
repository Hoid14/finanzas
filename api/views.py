import pandas as pd
from rest_framework.generics import CreateAPIView, ListCreateAPIView, DestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from api.models import Transaccion
from api.serializers import UserSerializer, TransaccionSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from rest_framework.permissions import IsAuthenticated

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class TransaccionListCreate(ListCreateAPIView):
    serializer_class = TransaccionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaccion.objects.filter(usuario=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(usuario=self.request.user)
        else:
            print(serializer.errors)


class TransaccionDelete(DestroyAPIView):
    serializer_class = Transaccion
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Transaccion.objects.filter(usuario=user)
    
class SumaTransaccionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, tipo, anno):
        user = request.user
        transacciones = Transaccion.objects.filter(usuario=user,tipo=tipo,fecha__year=int(anno))
        df = pd.DataFrame(list(transacciones.values()))
        if df.empty:
            total_monto = 0
        else:
            total_monto = df['monto'].sum()

        return Response({'total_monto': total_monto})
    
class CreateUserView(CreateAPIView):
    model = User
    serializer_class = UserSerializer