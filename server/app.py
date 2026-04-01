from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

app = Flask(__name__)
# Enable CORS so your frontend can talk to this backend
CORS(app)

# Connect to MongoDB (default local port is 27017)
client = MongoClient('mongodb://localhost:27017/')
# Select your database (must match what you named it in Compass)
db = client['greenbite']

# ==========================================
# ROUTES
# ==========================================

# 1. Contact Form Route
@app.route('/api/contact', methods=['POST'])
def save_contact():
    # Get the JSON data sent from the frontend
    data = request.get_json()
    
    # Add a timestamp so you know when they messaged you
    data['timestamp'] = datetime.datetime.utcnow()
    
    # Insert the data into the 'contacts' collection
    db.contacts.insert_one(data)
    
    return jsonify({"status": "success", "message": "Message saved successfully!"}), 201

if __name__ == '__main__':
    # Run the server on port 5000
    app.run(debug=True, port=5000)