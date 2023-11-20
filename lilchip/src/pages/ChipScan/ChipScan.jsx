import React, { useState } from "react";
import "./ChipScan.css";
import axios from "axios";

import ScanIcon from "../../assets/images/scanIcon.svg";

const ChipScan = () => {

    const [data, setData] = useState(null);
    const API_URL = "http://127.0.0.1:5000/api/v1/read_physical_chip_data?apikey=fe593a02b73346f4b5608ce8ec2d2f89";

    const handleGetData = async () => {
        axios
            .get(API_URL)
            .then(response => {
                setData(response.data);
                console.log(data)
            })
            .catch(error => {
                console.error("Error:", error)
            });

    }

    return (
        <div className="containerChipScan">
            <img src={ScanIcon} alt="ScanIcon" />
            <button className="button-blue" onClick={handleGetData}>Scan</button>
        </div>
    )
}

export default ChipScan