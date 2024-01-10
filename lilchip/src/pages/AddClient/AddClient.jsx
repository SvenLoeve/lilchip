import React, { useState } from "react";
import "./AddClient.css"

import ProfileIcon from "../../assets/images/profileIconBeta.svg"
import Button from "../../components/Button/Button";

const AddClient = () => {

    const [input, setInput] = useState({
        client: "",
        dateOfBirth: "",
    })

    const handleChange = event => {
        const { name, value } = event.target;
        setInput({
            ...input,
            [name]: value,
        })
    }
    const handleSubmission = event => {
        event.preventDefault();
        const formData = (input.client + input.dateOfBirth)
        console.log(formData);
    }


    return (
        <div>
            <form onSubmit={handleSubmission}>
                <div className="container chipScan">
                    <div className="container personalInformation">
                        <img src={ProfileIcon} alt="ProfileIcon" />
                        <text><span className="text-bold">Name: </span><input name="client" value={input.client} onChange={handleChange}></input></text>
                        <text><span className="text-bold">Date of birth: </span><input name="dateOfBirth" value={input.dateOfBirth} onChange={handleChange}></input></text>
                    </div>
                    <div className="container contactInformation">
                        <text className="text-bold">Contact information</text>
                        <text><span className="text-bold">Place of residence: </span><input></input></text>
                    </div>
                    <div className="container allergies">
                        <text className="text-bold">Allergies</text>
                        <input></input>
                    </div>
                    <div className="container medication">
                        <text className="text-bold">Medication</text>
                        <input></input>
                    </div>
                    <div className="container implants">
                        <text className="text-bold">Implants</text>
                        <input></input>
                    </div>
                    <Button type="submit" />
                </div>

            </form>
        </div>
    )
}

export default AddClient;