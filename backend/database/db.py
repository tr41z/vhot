from mongoengine import connect, ConnectionFailure
import logging

logging.basicConfig(level=logging.INFO)

class DB:
    """
    The DB object initializes connection with the database for app development.
    
    Initializers:
        - host (default: localhost)
        - port (default: 27017)
        - db_name (vhost_db)
    
    Usage:
        from db import DB
        new_db = DB(host, port, db_name)
    """
    def __init__(self, host='localhost', port=27017, db_name='vhost_db') -> None:
        self.host = host
        self.port = port
        self.db_name = db_name

    def connect(self, DB_URI):
        try:
            connect(self.db_name, host=DB_URI)
        except ConnectionFailure as e:
            logging.error(f"Failed to connect to the database: {e}")
            raise
        except Exception as e:
            logging.error(f"An unexpected error occurred: {e}")
            raise
