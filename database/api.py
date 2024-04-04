from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from rest_framework import status

from .models import Transaccion
from .models import Usuario

from .serializers import TransaccionSerializer
from .serializers import UsuarioSerializer

import base64
import numpy as np
import pandas as pd
import geopandas as gp
import matplotlib.pyplot as plt
from io import BytesIO
from rest_framework.decorators import action
def get_graph():
    """
    Genera y devuelve una representación gráfica en formato
    base64 de la figura actual de Matplotlib.

    Retorna:
    - Cadena de caracteres en formato base64 que representa
    la imagen gráfica en formato PNG.
    """
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph

# Que consultas se van a poder hacer
class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    permission_classes = [permissions.AllowAny] # Cualquier aplicacion cliente va a poder pedirle datos a mi servidor
    serializer_class = TransaccionSerializer

    @action(detail=False, methods=['get'], url_path='estadisticas/(?P<usuario_consultado>\w+)/(?P<tipo>\w+)/(?P<anno>\d+)')
    def getGrafica(self, request, usuario_consultado, tipo, anno):
        # Filtrar queryset por tipo, nombre de usuario y año
        
            registros = Transaccion.objects.filter(tipo=tipo, usuario=usuario_consultado, fecha__year=int(anno))
            
            transacciones_mes = {}
            if(tipo=='Gasto'):
                for transaccion in registros:
                    mes = transaccion.fecha.month
                    if transaccion.tipo == 'Gasto':
                        transacciones_mes[mes] = transacciones_mes.get(mes, 0) + transaccion.monto
            else:
                 for transaccion in registros:
                    mes = transaccion.fecha.month
                    if transaccion.tipo == 'Ingreso':
                        transacciones_mes[mes] = transacciones_mes.get(mes, 0) + transaccion.monto

            # Crear el gráfico de barras
            plt.switch_backend('AGG')
            plt.figure(figsize=(10, 6))
            plt.bar(transacciones_mes.keys(), transacciones_mes.values(), color='blue')
            if(tipo=='Gasto'):
                 plt.title(f'Gastos vs Mes - Año {anno}')
            elif(tipo=='Ingreso'):
                 plt.title(f'Ingresos vs Mes - Año {anno}')
            plt.xlabel('Mes')
            if (tipo=='Gasto'):
                 plt.ylabel('Gastos')
            elif(tipo=='Ingreso'):
                 plt.ylabel('Ingresos')
            plt.xticks(range(1, 13), ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'])
            plt.tight_layout()
            graph= get_graph()
            
            return Response({'grafico': graph})
    
    #Obtener Gastos/Ingresos anuales
    @action(detail=False, methods=['get'], url_path='suma/(?P<usuario_consultado>\w+)/(?P<tipo>\w+)/(?P<anno>\d+)')
    def getSumTransaccion(self, request, usuario_consultado, tipo, anno):
        registros = Transaccion.objects.filter(tipo=tipo, usuario=usuario_consultado, fecha__year=int(anno))
        data = registros.values()
        df = pd.DataFrame(data)
        suma_monto = df['monto'].sum()
        return Response({'suma': suma_monto})
    
    @action(detail=False, methods=['get'], url_path='ingreso_neto/(?P<usuario_consultado>\w+)/(?P<anno>\d+)/(?P<mes>\w+)')
    def getIngresoNetoTransaccion(self, request, usuario_consultado, anno, mes):
        if(mes=="todo"):#tiene en cuenta todos los meses del año
            registros = Transaccion.objects.filter( usuario=usuario_consultado, fecha__year=int(anno))
            data = registros.values()
            df = pd.DataFrame(data)
            sumaGasto = df.loc[df['tipo'] == 'Gasto', 'monto'].sum()
            sumaIngreso = df.loc[df['tipo'] == 'Ingreso', 'monto'].sum()
            ingreso_neto = sumaIngreso-sumaGasto
        else:#filtra por mes
            registros = Transaccion.objects.filter( usuario=usuario_consultado, fecha__year=int(anno), fecha__month=int(mes))
            data = registros.values()
            df = pd.DataFrame(data)
            sumaGasto = df.loc[df['tipo'] == 'Gasto', 'monto'].sum()
            sumaIngreso = df.loc[df['tipo'] == 'Ingreso', 'monto'].sum()
            ingreso_neto = sumaIngreso-sumaGasto
        return Response({'neto': ingreso_neto})
    
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


        
            



