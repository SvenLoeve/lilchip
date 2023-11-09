import React, { useState } from "react";
import axios from "axios";

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
        <div>
            <button onClick={handleGetData}>SCAN</button>
        </div>
    )
}

export default ChipScan