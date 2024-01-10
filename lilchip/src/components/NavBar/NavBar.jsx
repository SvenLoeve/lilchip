import React from "react";
import "./NavBar.css"
import Button from "../Button/Button";

const NavBar = () => {

    return (
        <div className="container-NavBar">
            <Button label="Logout" variant="4" route={"/"} />
            <Button label="Add client" variant="4" route={"/add-client"} />
            <Button label="Scan chip" variant="4" route={"/chip-scan"} />
            <Button label="Overview clients" variant="4" route={"/client-list"} />

        </div>
    )

};

export default NavBar;