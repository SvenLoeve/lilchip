from flask_mysql_connector import MySQL


class DBConnection:
    def __init__(self, app):
        self.mysql = MySQL(app)
        self.authenticate(app)

    def authenticate(self, app):
        app.config['MYSQL_HOST'] = 'localhost'
        app.config['MYSQL_USER'] = 'root'
        app.config['MYSQL_PASSWORD'] = ''
        app.config['MYSQL_DATABASE'] = 'demosandbox'

    def execute_query(self, query):
        try:
            self.cursor = self.mysql.connection.cursor()
            self.cursor.execute(query)
            results = self.cursor.fetchall()
            self.mysql.connection.commit()
            return results
        except Exception as e:
            print(f"Error executing query: {e}")
            return None
        finally:
            if 'cursor' in locals():
                self.cursor.close()
