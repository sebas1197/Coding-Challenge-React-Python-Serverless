import pytest
from unittest.mock import patch
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

@pytest.mark.django_db
class TestTaskListView:
    
    @patch('requests.get')
    def test_task_list_view_success(self, mock_get):
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = {"tasks": ["task1", "task2"]}

        client = APIClient()
        response = client.get(reverse('task-list'))
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"tasks": ["task1", "task2"]}
    
    @patch('requests.get')
    def test_task_list_view_failure(self, mock_get):
        mock_get.return_value.status_code = 500

        client = APIClient()
        response = client.get(reverse('task-list'))
        
        assert response.status_code == status.HTTP_500_INTERNAL_SERVER_ERROR
        assert response.data == {"error": "Error al obtener las tareas"}



@pytest.mark.django_db
class TestTaskCreateView:
    
    @patch('requests.post')
    def test_task_create_view_success(self, mock_post):
        mock_post.return_value.status_code = 201

        task_data = {"title": "New Task", "description": "Task description"}
        client = APIClient()
        response = client.post(reverse('task-create'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data == {"message": "Task created successfully!"}
    
    @patch('requests.post')
    def test_task_create_view_failure(self, mock_post):
        mock_post.return_value.status_code = 400

        task_data = {"title": "New Task", "description": "Task description"}
        client = APIClient()
        response = client.post(reverse('task-create'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"error": "Error al crear la tarea"}


@pytest.mark.django_db
class TestTaskUpdateView:
    
    @patch('requests.put')
    def test_task_update_view_success(self, mock_put):
        mock_put.return_value.status_code = 200

        task_data = {"id": 1, "title": "Updated Task", "description": "Updated description"}
        client = APIClient()
        response = client.put(reverse('task-update'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"message": "Task updated successfully!"}
    
    @patch('requests.put')
    def test_task_update_view_failure(self, mock_put):
        mock_put.return_value.status_code = 400

        task_data = {"id": 1, "title": "Updated Task", "description": "Updated description"}
        client = APIClient()
        response = client.put(reverse('task-update'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"error": "Error al actualizar la tarea"}


@pytest.mark.django_db
class TestTaskDeleteView:
    
    @patch('requests.delete')
    def test_task_delete_view_success(self, mock_delete):
        mock_delete.return_value.status_code = 200

        task_data = {"id": 1}
        client = APIClient()
        response = client.delete(reverse('task-delete'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"message": "Task deleted successfully!"}
    
    @patch('requests.delete')
    def test_task_delete_view_failure(self, mock_delete):
        mock_delete.return_value.status_code = 400

        task_data = {"id": 1}
        client = APIClient()
        response = client.delete(reverse('task-delete'), data=task_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"error": "Error al eliminar la tarea"}


@pytest.mark.django_db
class TestTaskLoginView:
    
    @patch('requests.post')
    def test_task_login_view_success(self, mock_post):
        mock_post.return_value.status_code = 200

        login_data = {"username": "user", "password": "password"}
        client = APIClient()
        response = client.post(reverse('task-login'), data=login_data, format='json')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data == {"message": "Login successfully!"}
    
    @patch('requests.post')
    def test_task_login_view_failure(self, mock_post):
        mock_post.return_value.status_code = 400

        login_data = {"username": "user", "password": "password"}
        client = APIClient()
        response = client.post(reverse('task-login'), data=login_data, format='json')
        
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.data == {"error": "Error in login"}