from dotenv import load_dotenv
import os

from config.config import app
from routes.router import router_blueprint
from database.db import DB

def main():
    app.config.from_object('config.config')

    # Initialize DB
    db = DB()
    
    # Load .env and connect to database
    load_dotenv()
    
    try:
        db.connect(os.getenv('MONGODB_URI'))
        
    except Exception as e:
        print("There was an error in main function: ", str(e))
        
    # Register blueprints
    app.register_blueprint(router_blueprint, url_prefix='/api/v1')

    return app

if __name__ == '__main__':
    app = main()
    app.run(debug=True, port=3001)
