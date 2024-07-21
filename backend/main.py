from dotenv import load_dotenv
import os
from config.config import app
from routes.router import router_blueprint
from database.db import DB
import logging

def create_app():
    # Load environment variables
    load_dotenv()
    
    # Configure the app
    app.config.from_object('config.config')

    # Initialize and connect to the database
    db = DB()
    try:
        db.connect(os.getenv('MONGODB_URI'))
    except Exception as e:
        logging.error("There was an error in main function: %s", str(e))
        raise

    # Register blueprints
    app.register_blueprint(router_blueprint, url_prefix='/api/v1')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=False)  
