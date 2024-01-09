import React from "react";
import "./ClientInfo.css";

const ClientInfo = ({ user }) => {
    return (
        <div className="clientInfo">
            <div className="infoItem">Name: {user.Name}</div>
            <div className="infoItem">Age: {user.Age}</div>
            <div className="infoItem">Place of residence: {user.PlaceOfResidence}</div>
        </div>
    )
};

export default ClientInfo