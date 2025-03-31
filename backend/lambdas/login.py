import json
import pymongo

mongo_uri = "mongodb+srv://sebastian:QBMJ6uEqYqksGlbB@cluster0.0pdwljp.mongodb.net/"
client = pymongo.MongoClient(mongo_uri)
db = client["auth"]  
collection = db["users"]  

def lambda_handler(event, context):
    try:
        print("Received event: " + json.dumps(event))
        
        if 'username' not in event or 'password' not in event:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'Missing required fields: username and/or password.'})
            }
        
        username = event['username']
        password = event['password']
        
        user = collection.find_one({"username": username})
        
        if not user:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'User not found.'})
            }
        
        if user.get('password') != password:
            return {
                'statusCode': 401,
                'body': json.dumps({'error': 'Invalid password.'})
            }
        
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Authentication successful!'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
