import React from "react";
import "./ClientInfo.css";
import { Link } from "react-router-dom";


const ClientInfo = ({ user }) => {

    const dataToPass = { Name: `${user.Name}`, Age: `${user.Age}`, PlaceOfResidence: `${user.PlaceOfResidence}` }

    return (
        <Link to={{
            pathname: `/client-Page`,
            state: { dataToPass }
        }}>
            <button className="clientInfo">
                <div className="infoItem">Name: {user.Name}</div>
                <div className="infoItem">Age: {user.Age}</div>
                <div className="infoItem">Place of residence: {user.PlaceOfResidence}</div>
            </button>
        </Link>

    )
};

export default ClientInfo