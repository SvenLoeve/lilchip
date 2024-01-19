import React from "react";
import "./ClientInfo.css";
import { Link } from "react-router-dom";

const ClientInfo = ({ user }) => {

    console.log(user.ID)
    return (
        <Link to={`/client-page/${user.ID}`}>
            <button className="clientInfo">
                <div className="infoItem">Name: {user.Name}</div>
                <div className="infoItem">Age: {user.Age}</div>
                <div className="infoItem">Place of residence: {user.PlaceOfResidence}</div>
            </button>
        </Link>
    )
};

export default ClientInfo