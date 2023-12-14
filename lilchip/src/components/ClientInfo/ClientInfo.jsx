import React from "react";
import "./ClientInfo.css";

const ClientInfo = ({ user }) => {
    return (
        <div className="clientInfo">
            <p>{user.Name}</p>
            <p>Birthday: {user.Age}</p>
        </div>
    )
};

export default ClientInfo