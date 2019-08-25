import React, {Component} from "react"

export class Navbar extends Component {

    render() {
        return <div className={"navBar"}>
            <ul>
                <li>
                    Home
                </li>
                <li>
                    MyPage
                </li>
                <li>
                    Explore
                </li>
            </ul>
        </div>
    }
}