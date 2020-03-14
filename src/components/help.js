import React from "react"
import "./help.css"
import { IconFont } from "./iconfont"

function Help(props) {
    return (
        <div className="Help">
            <div className="container">
                <div className="help-header">
                    <div style={{ color: "white" }}>Help</div>
                    <div onClick={() => props.control(false)}>
                        <IconFont
                            type="icon-close"
                            style={{
                                fontSize: 30,
                                color: "#f53b57"
                            }}
                        />
                    </div>
                </div>
                <div className="help-body">

                </div>
            </div>
        </div>
    )
}

export default Help
