import React from "react";
import "./NavBar.css"
import Button from "../Button/Button";

const NavBar = () => {




    return (
        <div className="container-NavBar">
            <Button label="Return to login" variant="4" route={"/"} />
            <Button label="Scan chip" variant="4" route={"/chip-scan"} />
            <Button label="Client list" variant="4" route={"/client-list"} />
        </div>
    )

};

export default NavBar;