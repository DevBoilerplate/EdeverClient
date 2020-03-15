import React from "react"
import "./Card.css"

export default function Card(props) {

    const openUrl = (url) => {
        let shell = window.electron.shell
        shell.openExternal(url)
    }

    return (
        <div className="Card">
            <div className="top">
                <div className="temp">{props.name}</div>
                <div className="updated">{props.updated}</div>
            </div>
            <div className="bottom">
                <div className="repo">
                    Git: <text onClick={() => {openUrl(props.url)}}>{props.url}</text>
                </div>
                <div className="desp">{props.desp}</div>
            </div>
        </div>
    )
}
