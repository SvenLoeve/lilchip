import React, { useState } from "react";
import "./ChipScan.css";

import "../../components/Button/Button"

import axios from "axios";

import ScanIcon from "../../assets/images/scanIcon.svg";
import ProfileIcon from "../../assets/images/profileIconBeta.svg"

import Button from "../../components/Button/Button";


const ChipScan = () => {

    const [data, setData] = useState(null);


    const API_URL = "http://127.0.0.1:5000/api/v1/read_physical_chip_data?apikey=fe593a02b73346f4b5608ce8ec2d2f89";

    const handleGetData = () => {
        axios
            .get(API_URL)
            .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }


    if (data === null) {
        return (
            <div className="container ChipScan">
                <img src={ScanIcon} alt="ScanIcon" />
                <Button onClick={handleGetData} label="Scan chip" variant="1" />
            </div>
        )
    } else {
        return (
            <div className="container ChipScan">
                <div className="container PersonalInformation">
                    <img src={ProfileIcon} alt="ProfileIcon" />
                    <text><span className="text-bold">Name: </span> {data.name}</text>
                    <text><span className="text-bold">Last name: </span>{data.lastName}</text>
                    <text><span className="text-bold">Date of birth: </span>{data.dateOfBirth}</text>
                    <text><span className="text-bold">Place of residence: </span>{data.placeOfResidence}</text>
                </div>
                <div className="container ContactInformation">
                    <text className="text-bold">Contact information</text>
                    <text><span className="text-bold">Emergency contact: </span>{data.emergencyContact}</text>
                    <text><span className="text-bold">Phone number: </span>{data.emergencyContactNumber}</text>
                </div>
                <div className="container Allergies">
                    <text className="text-bold">Allergies</text>
                    <text>{data.alergies}</text>
                </div>
                <div className="container Medication">
                    <text className="text-bold">Medication</text>
                    <text>{data.medication}</text>
                </div>
                <div className="container Implants">
                    <text className="text-bold">Implants</text>
                    <text>{data.implants}</text>
                </div>
            </div>
        )
    }

}

export default ChipScan