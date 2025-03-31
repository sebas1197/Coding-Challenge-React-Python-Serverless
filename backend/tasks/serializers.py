from rest_framework import serializers

class TaskSerializer(serializers.Serializer):
    _id = serializers.CharField(required=True)
    title = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    status = serializers.ChoiceField(choices=["TO_DO", "IN_PROGRESS", "COMPLETED"], required=False)
