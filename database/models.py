from django.db import models
# Create your models here.


class Usuario(models.Model):
    nombre = models.CharField(max_length=50, blank=False)
    usuario = models.CharField(max_length=20, unique=True, primary_key=True, blank=False)
    clave = models.CharField(max_length=20, blank=False)
    def __str__(self):
        return (self.usuario)
    
class Transaccion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, default="hoid")
    descripcion = models.CharField(max_length=200)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField() # YYYY-MM-DD"
    tipo = models.CharField(max_length=10, choices=[('Gasto', 'Gasto'), ('Ingreso', 'Ingreso')])

    
    def __str__(self):
        return self.descripcion

