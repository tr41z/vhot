from mongoengine import connect, ConnectionError

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
        except ConnectionError as e:
            print(f"Failed to connect to the database: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
