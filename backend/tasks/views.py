import requests
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LoginSerializer, TaskSerializer

class TaskListView(APIView):
    def get(self, request):
        try:
            external_response = requests.get(settings.EXTERNAL_API["LIST"])
            if external_response.status_code == 200:
                return Response(external_response.json(), status=status.HTTP_200_OK)
            return Response({"error": "Error al obtener las tareas"}, status=external_response.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TaskCreateView(APIView):
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            try:
                external_response = requests.post(settings.EXTERNAL_API["CREATE"], json=serializer.data)
                if external_response.status_code == 201:
                    return Response({"message": "Task created successfully!"}, status=status.HTTP_201_CREATED)
                return Response({"error": "Error al crear la tarea"}, status=external_response.status_code)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TaskUpdateView(APIView):
    def put(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            try:
                external_response = requests.put(settings.EXTERNAL_API["UPDATE"], json=serializer.data)
                if external_response.status_code == 200:
                    return Response({"message": "Task updated successfully!"}, status=status.HTTP_200_OK)
                return Response({"error": "Error al actualizar la tarea"}, status=external_response.status_code)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class TaskDeleteView(APIView):
    def delete(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            try:
                external_response = requests.delete(settings.EXTERNAL_API["DELETE"], json=serializer.data)
                if external_response.status_code == 200:
                    return Response({"message": "Task deleted successfully!"}, status=status.HTTP_200_OK)
                return Response({"error": "Error al eliminar la tarea"}, status=external_response.status_code)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class TaskLoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                external_response = requests.post(settings.EXTERNAL_API["LOGIN"], json=serializer.data)

                if external_response.status_code == 200:
                    return Response({"message": "Login successfully!"}, status=status.HTTP_200_OK)

                return Response({"error": "Error in login"}, status=external_response.status_code)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)