import React, { useState } from "react";
import "./AddClient.css"

import ProfileIcon from "../../assets/images/profileIconBeta.svg"
import Button from "../../components/Button/Button";

const AddClient = () => {

    const [inputData, setInputData] = useState({
        Name: "",
        // DateOfBirth: "",
        PlaceOfResidence: "",
        ICEContact: "",
        Allergies: "",
        Medications: "",
        Implants: "",
    })

    const handleChange = event => {
        const { name, value } = event.target;
        setInputData({
            ...inputData,
            [name]: value,
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputData)

        try {
            fetch("http://localhost:5000/add_personal_info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputData),
            },
                alert("Client added"))
        } catch (error) {
            console.error("Failed to add user")
        }

    }


    return (
        <div>
            <div className="container addClient">
                <div className="container clientInfoInput">
                    <div className="container personalInformationInput">
                        <img src={ProfileIcon} alt="ProfileIcon" />
                        <text><span className="text-bold">Name: </span><input name="Name" value={inputData.nameInput} onChange={handleChange}></input></text>
                        {/* <text><span className="text-bold">Date of birth: </span><input name="DateOfBirth" value={inputData.dateOfBirthInput} onChange={handleChange}></input></text> */}
                    </div>
                    <div className="container contactInformation">
                        <text className="text-bold">Contact information</text>
                        <text><span className="text-bold">Place of residence: </span><input name="PlaceOfResidence" value={inputData.placeOfResidenceInput} onChange={handleChange}></input></text>
                        <text><span className="text-bold">Emergency contact: </span><input name="ICEContact" value={inputData.emergencyContactInput} onChange={handleChange}></input></text>
                    </div>
                    <div className="container allergies">
                        <text className="text-bold">Allergies</text>
                        <input name="Allergies" value={inputData.allergiesInput} onChange={handleChange}></input>
                    </div>
                    <div className="container medication">
                        <text className="text-bold">Medication</text>
                        <input name="Medications" value={inputData.medicationsInput} onChange={handleChange}></input>
                    </div>
                    <div className="container implants">
                        <text className="text-bold">Implants</text>
                        <input className="allergiesInput" name="Implants" value={inputData.implantsInput} onChange={handleChange}></input>
                    </div>

                </div>
                <div className="buttons">
                    <Button label="Cancel" />
                    <Button label="Add client" onClick={handleSubmit} /></div>

            </div>
        </div>
    )
}

export default AddClient;