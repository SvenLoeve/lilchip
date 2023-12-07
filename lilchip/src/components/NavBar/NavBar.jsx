import React, { useEffect } from "react";
import "./NavBar.css"
import Button from "../Button/Button";
import { useNavigate, Link } from "react-router-dom";

const NavBar = () => {

    // useEffect = (() => {
    //     console.log("Dit zuigt")
    // }, [])

    // const navigate = useNavigate();


    // const handleNavigate = (route) => {
    //     navigate(route)
    //     console.log("Sven doe is leuk")
    // }



    return (
        <nav>
            <div className="container-NavBar">
                {/* <button onClick={handleNavigate("/")}> Je moeder</button>
            <Button onClick={handleNavigate("/")} label="Je moeder" variant="1" />
            <Button label="Je moeder" variant="1" />
            <Button label="Je moeder" variant="1" /> */}
                <li>
                    <Link to="/">Home</Link>
                </li>
            </div>
        </nav>
    )

};

export default NavBar;