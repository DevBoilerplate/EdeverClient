import React from "react"
import "./Card.css"
import Text from "antd/lib/typography/Text"

export default function Card(props) {
    const openUrl = url => {
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
                    Git:
                    <Text
                        onClick={() => {
                            openUrl(props.url)
                        }}
                        style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                        {props.url}
                    </Text>
                </div>
                <div className="desp">{props.desp}</div>
            </div>
        </div>
    )
}
