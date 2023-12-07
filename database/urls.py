from rest_framework import routers
from .api import TransaccionViewSet
from .api import UsuarioViewSet

router = routers.DefaultRouter()

router.register('api/Transacciones', TransaccionViewSet, 'transacciones')
router.register('api/Usuarios', UsuarioViewSet, 'usuarios')


urlpatterns = router.urls