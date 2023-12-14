from flask import Flask, render_template, request, jsonify
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# MySQL configurations
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'demosandbox',
}

# Initialize the MySQL connection
connection = mysql.connector.connect(**mysql_config)
cursor = connection.cursor(buffered=True)
# Route to display data from the database
@app.route('/')

@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        # Extract data from the request
        user_id = data['UserID']
        username = data['Username']
        password = data['Password']

        # Insert data into the Users table
        cursor = connection.cursor()
        cursor.execute('INSERT INTO Users (UserID, Username, Password) VALUES (%s, %s, %s)', (user_id, username, password))
        connection.commit()
        cursor.close()

        return jsonify({'message': 'User added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        with connection.cursor(dictionary=True) as cursor:
            cursor.execute('SELECT * FROM Users')
            data = cursor.fetchall()

        return jsonify({'users': data}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        with connection.cursor() as cursor:
            cursor.execute('DELETE FROM Users WHERE UserID = %s', (user_id,))
            connection.commit()

        return jsonify({'message': 'User deleted successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/update_user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        new_username = data['Username']
        new_password = data['Password']

        with connection.cursor() as cursor:
            cursor.execute('UPDATE Users SET Username = %s, Password = %s WHERE UserID = %s', (new_username, new_password, user_id))
            connection.commit()

        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/add_medical', methods=['POST'])
def add_medical():
    try:
        data = request.get_json()

        # Extract data from the request
        key_id = data['key_id']
        serial = data['Serial']
        medical_data = data['Medical_Data']

        # Insert data into the Users table
        cursor = connection.cursor()
        cursor.execute('INSERT INTO Medical_Data (KeyID, Serial, Medical_Data, Access_Timestamp) VALUES (%s, %s, %s, NOW())', (key_id, serial, medical_data))
        connection.commit()
        cursor.close()

        return jsonify({'message': 'Medical added successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/add_personal_info', methods=['POST'])
def add_personal_info():
    try:
        data = request.get_json()

        insert_query = """
        INSERT INTO PersonalInformation
        (Name, DateOfBirth, Age, PlaceOfResidence, InsuranceInformation, ICEContact, BloodType, Allergies, Medications, Implants)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """

        # Establish a connection and create a cursor
        with connection.cursor() as cursor:
            # Execute the query with the data provided
            cursor.execute(
                insert_query,
                (
                    data['Name'],
                    datetime.strptime(data['DateOfBirth'], '%Y-%m-%d').date() if 'DateOfBirth' in data else None,
                    data['Age'] if 'Age' in data else None,
                    data['PlaceOfResidence'] if 'PlaceOfResidence' in data else None,
                    data['InsuranceInformation'] if 'InsuranceInformation' in data else None,
                    data['ICEContact'] if 'ICEContact' in data else None,
                    data['BloodType'] if 'BloodType' in data else None,
                    data['Allergies'] if 'Allergies' in data else None,
                    data['Medications'] if 'Medications' in data else None,
                    data['Implants'] if 'Implants' in data else None
                )
            )

            # Commit the changes to the database
            connection.commit()

        return jsonify({'message': 'Personal information added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#@app.route('/get_personal_info', methods=['GET'])
#def get_personal_info():
    try:
        # Get the name from the query parameters
        name = request.args.get('name')

        # Execute the query to retrieve personal information by name
        select_query = "SELECT * FROM PersonalInformation WHERE Name = %s"
        cursor.execute(select_query, (name,))
        result = cursor.fetchone()

        if result:
            # Convert the result to a dictionary for JSON response
            columns = [col[0] for col in cursor.description]
            personal_info_dict = dict(zip(columns, result))
            return jsonify(personal_info_dict), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_personal_info', methods=['GET'])
def get_personal_info():
    try:
        # Get the ID from the query parameters
        user_id = request.args.get('id')

        # Execute the query to retrieve personal information by ID
        select_query = "SELECT * FROM PersonalInformation WHERE ID = %s"
        cursor.execute(select_query, (user_id,))
        result = cursor.fetchone()

        if result:
            # Convert the result to a dictionary for JSON response
            columns = [col[0] for col in cursor.description]
            personal_info_dict = dict(zip(columns, result))
            return jsonify(personal_info_dict), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/delete_personal_info', methods=['DELETE'])
def delete_personal_info():
    try:
        # Get the name from the query parameters
        name = request.args.get('name')

        # Establish a connection and create a cursor
        with connection.cursor() as cursor:
            # Execute the query to delete personal information by name
            delete_query = "DELETE FROM PersonalInformation WHERE Name = %s"
            cursor.execute(delete_query, (name,))

            # Commit the changes to the database
            connection.commit()

            if cursor.rowcount > 0:
                return jsonify({'message': 'User deleted successfully'}), 200
            else:
                return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/insert_data', methods=['POST'])
def insert_data():
    try:
        # Parse JSON data from the request
        data = request.json

        # Extract data from the JSON
        user_data = data.get('user_data')
        auth_service_data = data.get('auth_service_data')
        encryption_keys_data = data.get('encryption_keys_data')
        medical_data = data.get('medical_data')

        # Insert data into the Users table
        cursor.execute("INSERT INTO Users (UserID, Username, Password) VALUES (%s, %s, %s)",
                       (user_data['UserID'], user_data['Username'], user_data['Password']))
        connection.commit()

        # Insert data into the External_Authentication_Service table
        cursor.execute("INSERT INTO External_Authentication_Service (ServiceID, UserID, API_Key, Service_Name) "
                       "VALUES (%s, %s, %s, %s)",
                       (auth_service_data['ServiceID'], auth_service_data['UserID'],
                        auth_service_data['API_Key'], auth_service_data['Service_Name']))
        connection.commit()

        # Insert data into the Encryption_Keys table
        cursor.execute("INSERT INTO Encryption_Keys (Service_ID, KeyID, List_of_keys) "
                       "VALUES (%s, %s, %s)",
                       (encryption_keys_data['Service_ID'], encryption_keys_data['KeyID'],
                        encryption_keys_data['List_of_keys']))
        connection.commit()

        # Insert data into the Medical_Data table
        cursor.execute("INSERT INTO Medical_Data (KeyID, Serial, Medical_Data, Access_Timestamp) "
                       "VALUES (%s, %s, %s, %s)",
                       (medical_data['KeyID'], medical_data['Serial'],
                        medical_data['Medical_Data'], medical_data['Access_Timestamp']))
        connection.commit()

        return jsonify({'message': 'Data inserted successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Endpoint to handle the JSON file( get the ful file and edits it to the ID)
@app.route('/process_json', methods=['POST'])
def process_json():
    try:
        # Get the JSON file from the request
        json_data = request.get_json()

        # Extract ID from the JSON file
        file_id = json_data.get('ID')

        # Query the database for the corresponding record
        query = "SELECT * FROM PersonalInformation WHERE ID = %s"
        cursor.execute(query, (file_id,))
        record = cursor.fetchone()

        if record:
            # Convert the database record to a dictionary
            result_dict = {
                'ID': record[0],  # Assuming ID is the first column.
            }

            # Return the result as JSON
            return jsonify(result_dict)
        else:
            return jsonify({'error': 'Record not found'})

    except Exception as e:
        return jsonify({'error': str(e)})
    

@app.route('/get_and_process_personal_info', methods=['GET', 'POST'])
def get_and_process_personal_info():
    try:
        if request.method == 'GET':
            # Get the ID from the query parameters
            user_id = request.args.get('id')

            # Execute the query to retrieve personal information by ID
            select_query = "SELECT * FROM PersonalInformation WHERE ID = %s"
            cursor.execute(select_query, (user_id,))
            result = cursor.fetchone()

            if result:
                # Convert the result to a dictionary for JSON response
                columns = [col[0] for col in cursor.description]
                personal_info_dict = dict(zip(columns, result))
                return jsonify(personal_info_dict), 200
            else:
                return jsonify({'message': 'User not found'}), 404

        elif request.method == 'POST':
            # Get the JSON file from the request
            json_data = request.get_json()

            # Extract ID from the JSON file
            file_id = json_data.get('ID')

            # Query the database for the corresponding record
            query = "SELECT * FROM PersonalInformation WHERE ID = %s"
            cursor.execute(query, (file_id,))
            record = cursor.fetchone()

            if record:
                # Convert the database record to a dictionary
                result_dict = {
                    'ID': record[0],  # Assuming ID is the first column.
                    # Add other fields as needed
                }

                # Return the result as JSON
                return jsonify(result_dict)
            else:
                return jsonify({'error': 'Record not found'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/get_all_personal_info', methods=['GET'])
def get_all_personal_info():
    try:

        select_query = "SELECT * FROM PersonalInformation"
        cursor.execute(select_query)
        result = cursor.fetchall()

        if result:
            columns = [col[0] for col in cursor.description]
            personal_info_list = [dict(zip(columns, row)) for row in result]
            return jsonify(personal_info_list), 200
        else:
            return jsonify({'message': 'No user records found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    return response

if __name__ == '__main__':
    app.run(debug=True)


