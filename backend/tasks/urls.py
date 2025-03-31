from django.urls import path
from .views import TaskListView, TaskCreateView, TaskLoginView, TaskUpdateView, TaskDeleteView
from drf_yasg.views import schema_view

urlpatterns = [
    path('list/', TaskListView.as_view(), name='task-list'),
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('update/', TaskUpdateView.as_view(), name='task-update'),
    path('delete/', TaskDeleteView.as_view(), name='task-delete'),
    path('login/', TaskLoginView.as_view(), name='task-login'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='swagger-json'),
]
