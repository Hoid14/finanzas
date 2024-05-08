from django.urls import path
from .views import MyTokenObtainPairView, CreateUserView, TransaccionListCreate, TransaccionDelete, SumaTransaccionView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name="registro"),

    path('transacciones/', TransaccionListCreate.as_view(), name="transaccion-list"),
    path('transacciones/delete/<int:pk>/', TransaccionDelete.as_view(), name="delete-transaccion"),
    path('transacciones/suma/<str:tipo>/<int:anno>/', SumaTransaccionView.as_view(), name='suma-transaccion'),
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]