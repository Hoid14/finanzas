from django.db import models
from django.contrib.auth.models import User
# Create your models here.

    
class Transaccion(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transacciones", null=False)
    descripcion = models.CharField(max_length=200)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField() # YYYY-MM-DD"
    tipo = models.CharField(max_length=10, choices=[('Gasto', 'Gasto'), ('Ingreso', 'Ingreso')])
    
    def __str__(self):
        return self.descripcion

