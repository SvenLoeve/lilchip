import React, { useState } from "react";
import "./ChipScan.css";

import "../../components/Button/Button"

import axios from "axios";

import ScanIcon from "../../assets/images/scanIcon.svg";
import Button from "../../components/Button/Button";

const ChipScan = () => {

    // const [data, setData] = useState(null);

    //dummy data
    const [data, setData] = useState({
        name: "Joe",
        lastName: "Momma",
        dateOfBirth: "04-20-1969",
        placeOfResidence: "Utrecht",
        phoneNumber: "06-96969696",
        emergencyContact: "Harry Styles",
        emergencyContactNumber: "06-96969420",
        alergies: "Deez nuts",
        medication: "Da weed",
        implants: "Cyberpunk"
    });


    const API_URL = "http://127.0.0.1:5000/api/v1/read_physical_chip_data?apikey=fe593a02b73346f4b5608ce8ec2d2f89";

    const handleGetData = () => {
        axios
            .get(API_URL)
            .then(response => {
                setData(response.data);
                console.log(data)
            })
            .catch(error => {
                console.error("Error:", error)
                alert("Error, no chip found")
            });

    }

    if (data == null) {
        return (
            <div className="containerChipScan">
                <img src={ScanIcon} alt="ScanIcon" />
                <Button onClick={handleGetData} label="Scan chip" variant="1" />
            </div>
        )
    }
    else {
        return (
            <div className="containerChipScan">
                <div className="containerPersonalInformation">
                    <text>Name: {data.name}</text>
                    <text>Last name: {data.lastName}</text>
                    <text>Date of birth: {data.dateOfBirth}</text>
                    <text>Place of residence: {data.placeOfResidence}</text>
                </div>
                <div className="containerContactInformation">
                    <text>Contact information</text>
                    <text>Phone number {data.phoneNumber}</text>
                    <text>Emergency contact {data.emergencyContact}</text>
                    <text>PhoneNumber {data.emergencyContactNumber}</text>
                </div>
                <div className="containerAllergies">
                    <text>Allergies</text>
                    <text>{data.alergies}</text>
                </div>
                <div className="containerMedication">
                    <text>Medication</text>
                    <text>{data.medication}</text>
                </div>
                <div className="containerImplants">
                    <text>Implants</text>
                    <text>{data.implants}</text>
                </div>
            </div>
        )
    }

}

export default ChipScan