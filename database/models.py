from django.db import models

# Create your models here.

    
class Transaccion(models.Model):
    descripcion = models.CharField(max_length=200)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateField(auto_now_add=True) # Campo de fecha que se establece 
                                                # automáticamente en la fecha de 
                                                # creación del objeto.
    tipo = models.CharField(max_length=10, choices=[('Gasto', 'Gasto'), ('Ingreso', 'Ingreso')])
    
    def __str__(self):
        return self.descripcion

class Usuario(models.Model):
    nombre = models.CharField(max_length=20, blank=False)
    usuario = models.CharField(max_length=20, blank=False, primary_key=True)
    clave = models.CharField(max_length=20, blank=False)

    def __str__(self):
        return (self.usuario)