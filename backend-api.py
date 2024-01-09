from flask import Flask, jsonify, render_template, request
from authentication.authenticate import Authenticator
from reader.read_nfc_tag import ReadNFC
from database.connection import DBConnection
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

authenticator = Authenticator("fe593a02b73346f4b5608ce8ec2d2f89")
nfc_reader = ReadNFC()


class BackendAPI:
    # Initialises default variables/tasks & creates routes
    def __init__(self):
        self.app = Flask(__name__)
        CORS(self.app)
        self.sendQuery = DBConnection(self.app)

        self.app.add_url_rule("/", 'landingspage', self.landingspage, methods=['GET'])
        self.app.add_url_rule("/api/v1/read_physical_chip_data", 'read_physical_chip_data',
                              self.read_physical_chip_data, methods=['GET'])
        self.app.add_url_rule("/api/v1/register", 'register_user', self.register_user, methods=['POST'])

    # Creates the langdingspage
    def landingspage(self):
        results = self.sendQuery.execute_query("SELECT Username FROM users WHERE UserID=1")
        if results is not None:
            return f"Welcome to the API of LilChip. Query results: {results}"
        else:
            return "Error executing the query."

    # Creates the read_physical_chip_data endpoint
    @authenticator.authenticate
    def read_physical_chip_data(self):
        self.data = nfc_reader.read_chip_from_reader()
        return jsonify(self.data)

    # Creates and authenticates the register_user endpoint
    @authenticator.authenticate
    def register_user(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'message': 'Username and password are required'}), 400

        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        query = f"INSERT INTO users (username, password) VALUES ('{username}', '{hashed_password}')"

        try:
            self.sendQuery.execute_query(query)
            return jsonify({'message': 'User registered successfully'}), 201
        except Exception as e:
            return jsonify({'message': f'Error registering user: {e}'}), 500

    # Runs the application
    def run(self):
        self.app.run(debug=True)


if __name__ == '__main__':
    backend_api = BackendAPI()
    backend_api.run()
