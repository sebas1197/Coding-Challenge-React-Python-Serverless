import json
import pymongo
import os
from bson.json_util import dumps

# GET ALL TASKS
def lambda_handler(event, context):
    try:
        mongo_uri = "mongodb+srv://sebastian:QBMJ6uEqYqksGlbB@cluster0.0pdwljp.mongodb.net/"
        client = pymongo.MongoClient(mongo_uri)
        db = client["tasks_db"] 
        collection = db["tasks"]

        tasks = list(collection.find())
        
        return {
            'statusCode': 200,
            'body': dumps(tasks)
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }


# UPDATE TASK

import json
import pymongo
from enum import Enum
from typing import TypedDict

class TaskStatus(str, Enum):
    TO_DO = "TO_DO"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Task(TypedDict):
    _id: str
    title: str
    description: str
    status: TaskStatus

mongo_uri = "mongodb+srv://sebastian:QBMJ6uEqYqksGlbB@cluster0.0pdwljp.mongodb.net/"
client = pymongo.MongoClient(mongo_uri)
db = client["tasks_db"] 
collection = db["tasks"]

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event))
        task_data = event

        if '_id' not in task_data or 'status' not in task_data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields: _id or status.'})
            }

        result = collection.update_one(
            {"_id": task_data["_id"]},  
            {"$set": {"status": task_data["status"]}} 
        )

        if result.matched_count == 0:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Task not found.'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Task status updated successfully!'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }


# DELETE TASK

import json
import pymongo

mongo_uri = "mongodb+srv://sebastian:QBMJ6uEqYqksGlbB@cluster0.0pdwljp.mongodb.net/"
client = pymongo.MongoClient(mongo_uri)
db = client["tasks_db"] 
collection = db["tasks"]

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event))

        task_data = event

        if '_id' not in task_data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required field: _id.'})
            }

        result = collection.delete_one({"_id": task_data["_id"]})

        if result.deleted_count == 0:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Task not found.'})
            }

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Task deleted successfully!'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }



# CREATE TASK

import json
import pymongo
import os
from bson.json_util import dumps
from enum import Enum
from typing import TypedDict

class TaskStatus(str, Enum):
    TO_DO = "TO_DO"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Task(TypedDict):
    _id: str
    title: str
    description: str
    status: TaskStatus


mongo_uri = "mongodb+srv://sebastian:QBMJ6uEqYqksGlbB@cluster0.0pdwljp.mongodb.net/"
client = pymongo.MongoClient(mongo_uri)
db = client["tasks_db"] 
collection = db["tasks"]

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event))

        task_data = event
        
        if 'title' not in task_data or 'description' not in task_data or 'status' not in task_data:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields: title, description, or status.'})
            }

        task = {
            "_id": task_data["_id"],
            "title": task_data["title"],
            "description": task_data["description"],
            "status": task_data["status"]
        }
        
        collection.insert_one(task)

        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Task created successfully!'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }