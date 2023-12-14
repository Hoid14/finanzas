from rest_framework import serializers
from .models import Transaccion
from .models import Usuario

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'
        read_only_fields = ('fecha', ) # no permite actualizar
                                       # la coma es importante

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'