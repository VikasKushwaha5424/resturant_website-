from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import datetime

app = Flask(__name__)
# Enable CORS so your frontend (running on a different port) can talk to this backend
CORS(app)

# ==========================================
# MONGODB CONNECTION
# ==========================================
try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=5000)
    client.server_info()  # Force connection test
    db = client['greenbite']
    print("✅ Connected to MongoDB successfully!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    db = None

# ==========================================
# API ROUTES
# ==========================================

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    if db is not None:
        try:
            client.server_info()
            return jsonify({
                "status": "healthy",
                "server": "running",
                "database": "connected",
                "db_name": "greenbite"
            }), 200
        except Exception:
            return jsonify({"status": "unhealthy", "database": "disconnected"}), 500
    return jsonify({"status": "unhealthy", "database": "not initialized"}), 500


# 1. Contact Form
@app.route('/api/contact', methods=['POST'])
def save_contact():
    if db is None:
        return jsonify({"status": "error", "message": "Database not connected"}), 500
    data = request.get_json()
    data['timestamp'] = datetime.datetime.utcnow()
    data['form_type'] = 'contact'
    db.contacts.insert_one(data)
    return jsonify({"status": "success", "message": "Message saved successfully!"}), 201


# 2. Reservation Form
@app.route('/api/reservation', methods=['POST'])
def save_reservation():
    if db is None:
        return jsonify({"status": "error", "message": "Database not connected"}), 500
    data = request.get_json()
    data['timestamp'] = datetime.datetime.utcnow()
    data['form_type'] = 'reservation'
    db.reservations.insert_one(data)
    return jsonify({"status": "success", "message": "Reservation saved successfully!"}), 201


# 3. Careers Form
@app.route('/api/careers', methods=['POST'])
def save_career():
    if db is None:
        return jsonify({"status": "error", "message": "Database not connected"}), 500
    data = request.get_json()
    data['timestamp'] = datetime.datetime.utcnow()
    data['form_type'] = 'career_application'
    db.careers.insert_one(data)
    return jsonify({"status": "success", "message": "Application saved successfully!"}), 201


# 4. Catering Form
@app.route('/api/catering', methods=['POST'])
def save_catering():
    if db is None:
        return jsonify({"status": "error", "message": "Database not connected"}), 500
    data = request.get_json()
    data['timestamp'] = datetime.datetime.utcnow()
    data['form_type'] = 'catering_inquiry'
    db.catering.insert_one(data)
    return jsonify({"status": "success", "message": "Catering inquiry saved successfully!"}), 201


# 5. Orders (Checkout)
@app.route('/api/orders', methods=['POST'])
def save_order():
    if db is None:
        return jsonify({"status": "error", "message": "Database not connected"}), 500
    data = request.get_json()
    data['timestamp'] = datetime.datetime.utcnow()
    data['form_type'] = 'order'
    db.orders.insert_one(data)
    return jsonify({"status": "success", "message": "Order saved successfully!"}), 201


if __name__ == '__main__':
    print("\n🍛 GreenBite API Server")
    print("=" * 40)
    print("🌐 API running on: http://localhost:5000")
    print("📋 Endpoints:")
    print("   GET  /api/health")
    print("   POST /api/contact")
    print("   POST /api/reservation")
    print("   POST /api/careers")
    print("   POST /api/catering")
    print("   POST /api/orders")
    print("=" * 40)
    print("\n⚠️  Now open a NEW terminal and run the client!\n")
    app.run(debug=True, port=5000)