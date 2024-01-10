import React, { useState, useEffect } from "react";
import "./ClientList.css";
import ClientInfo from "../../components/ClientInfo/ClientInfo";
import axios from "axios";
import { Link } from "react-router-dom";

const ClientList = () => {
    const [users, setUsers] = useState([
    ]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/get_all_personal_info")
            .then(response => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <div className="container test">
                <h1>User list</h1>
                {users.map(user => (
                    <ClientInfo key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}

export default ClientList;