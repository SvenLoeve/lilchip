import React from "react";
import "./DefaultLayout.css"
import Logo from "../../assets/images/lilchipLogo.png";

export default function DefaultLayout({ children, }) {
    return (
        <div className="background">
            <div className="credits">
                <img src={Logo} alt="Lilchip Logo"></img>
                <div className="text-white">Li'lchip</div>
            </div>
            {children}
        </div>

    )
}
