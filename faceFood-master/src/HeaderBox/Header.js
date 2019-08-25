import React, { Component} from "react";
import {Navbar} from "./Navbar/Navbar";

export class HeaderBox extends Component {
    render() {
    return (
        <div className={"header"}>
            <div className={"logo"}> </div>
            <h1>
                FaceFood
            </h1>
            <Navbar/>
        </div>
    )
    }
}

