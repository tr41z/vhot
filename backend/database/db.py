from mongoengine import connect

class DB:
    """
    The DB object initializes connection with database for app development.
    
    Initializers:
        - host (default: localhost)
        - port (default: 27017)
        - db_name (flask_db)
    
    Usage:
        from db import DB
        new_db = DB(host, port, db_name)
    """
    def __init__(self, host='localhost', port=27017, db_name='vhost_db') -> None:
        self.host = host
        self.port = port
        self.db_name = db_name

    def connect(self, DB_URI):
        connect(self.db_name, host=DB_URI)
        print("Successfully connected to MongoDB!")
