import React, { useState } from "react";
import "./ClientPage.css";
import { useEffect } from "react";
import axios from "axios";

import ProfileIcon from "../../assets/images/profileIconBeta.svg"
import { useParams } from "react-router-dom";

const ClientPage = () => {

    const { clientId } = useParams();

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        console.log(clientId)
        axios
            .get(`http://localhost:5000/get_personal_info?id=${clientId}`)
            .then(response => {
                setUserInfo(response.data)
                console.log(response.data)
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [clientId]);

    return (
        <div>
            {userInfo ? (<div className="container chipScan">
                <div className="container personalInformation">
                    <img src={ProfileIcon} alt="ProfileIcon" />
                    <text><span className="text-bold">Name: </span> {userInfo.Name}</text>
                    <text><span className="text-bold">Date of birth: </span>{userInfo.Age}</text>
                </div>
                <div className="container contactInformation">
                    <text className="text-bold">Contact information</text>
                    <text><span className="text-bold">Place of residence: </span>{userInfo.PlaceOfResidence}</text>
                </div>
                <div className="container allergies">
                    <text className="text-bold">Allergies</text>
                </div>
                <div className="container medication">
                    <text className="text-bold">Medication</text>
                </div>
                <div className="container implants">
                    <text className="text-bold">Implants</text>
                </div>
            </div>) : (
                <p>loading...</p>
            )}
        </div>
    )
}

export default ClientPage;