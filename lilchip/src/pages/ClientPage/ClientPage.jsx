import React from "react";
import "./ClientPage.css";

import ProfileIcon from "../../assets/images/profileIconBeta.svg"

const ClientPage = (props) => {

    const { state } = props.location;
    const { Name, Age, PlaceOfResidence } = state;

    return (
        <div>
            <div className="container chipScan">
                <div className="container personalInformation">
                    <img src={ProfileIcon} alt="ProfileIcon" />
                    <text><span className="text-bold">Name: </span> {Name}</text>
                    <text><span className="text-bold">Date of birth: </span>{Age}</text>
                </div>
                <div className="container contactInformation">
                    <text className="text-bold">Contact information</text>
                    <text><span className="text-bold">Place of residence: </span>{PlaceOfResidence}</text>
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
            </div>
        </div>
    )
}

export default ClientPage;