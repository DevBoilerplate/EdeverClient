import React from "react"
import "./help.css"
import { IconFont } from "./iconfont"

function Help(props) {
    return (
        <div className="Help">
            <div className="container">
                <div className="help-header">
                    <div style={{ color: "white" }}>Help & About</div>
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
                    <div style={{ color: "#3c40c6" }}>Edever Client</div>
                    <div>一个跟踪electron系列框架动态的客户端...</div>
                    <br />
                    <div>Author: Herbert He</div>
                    <div>Email: admin@jieec.cn / Herbert.He0229@gmail.com</div>
                    <div>Blog: https://goer.icu</div>
                    <div>Version: v1.2.0</div>
                    <div>
                        Issues: https://github.com/HerbertHe/EdeverClient/issues
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help
