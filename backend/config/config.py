import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
import cloudinary
import logging

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)
CORS(app)

# Cloudinary configuration
try:
    cloudinary.config(
        cloud_name=os.getenv('CLOUD_NAME'),
        api_key=os.getenv('API_KEY'),
        api_secret=os.getenv('API_SECRET'),
        secure=True
    )
except Exception as e:
    logging.error("Error configuring Cloudinary: %s", str(e))
    raise

# Production configurations
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['SESSION_COOKIE_SECURE'] = True
app.config['REMEMBER_COOKIE_SECURE'] = True
app.config['PREFERRED_URL_SCHEME'] = 'https'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['REMEMBER_COOKIE_HTTPONLY'] = True

logging.basicConfig(level=logging.INFO)

if __name__ == '__main__':
    app.run(debug=False)
