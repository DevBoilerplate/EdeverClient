import React, { useState } from "react"
import "./App.css"
import Template from "./components/template"
import Package from "./components/package"
import Edever from "./components/edever"
import Help from "./components/help"
import Download from "./components/download"
import { IconFont } from "./components/iconfont"

function App() {
    const [page, setPage] = useState("Template")
    const [help, setHelp] = useState(false)

    const minimizeWin = () => {
        let ipcRender = window.electron.ipcRenderer
        ipcRender.send("minimize-window")
    }

    const closeWin = () => {
        let ipcRender = window.electron.ipcRenderer
        ipcRender.send("window-all-closed")
    }
    return (
        <div className="App">
            <div className="bar-left">
                <div className="app-top">
                    <div
                        className="app-icon"
                        onClick={() => setPage("Template")}
                    >
                        <IconFont
                            type="icon-template"
                            style={{ fontSize: 30, color: "white" }}
                        />
                    </div>
                    <div
                        className="app-icon"
                        onClick={() => setPage("Package")}
                    >
                        <IconFont
                            type="icon-package"
                            style={{ fontSize: 30, color: "white" }}
                        />
                    </div>
                    <div className="app-icon" onClick={() => setPage("Edever")}>
                        <IconFont
                            type="icon-cli"
                            style={{ fontSize: 30, color: "white" }}
                        />
                    </div>
                    <div
                        className="app-icon"
                        onClick={() => setPage("Download")}
                    >
                        <IconFont
                            type="icon-download"
                            style={{ fontSize: 30, color: "white" }}
                        />
                    </div>
                </div>
                <div className="app-bottom">
                    <div className="app-icon" onClick={() => setHelp(true)}>
                        <IconFont
                            type="icon-help"
                            style={{ fontSize: 30, color: "white" }}
                        />
                    </div>
                </div>
            </div>
            <div className="bar-right">
                <div className="right-top-bar">
                    <div>{page}</div>
                    <div>
                        <IconFont
                            type="icon-minify"
                            style={{ fontSize: 20 }}
                            onClick={() => minimizeWin()}
                        />
                        <IconFont
                            type="icon-close"
                            style={{ fontSize: 20 }}
                            onClick={() => closeWin()}
                        />
                    </div>
                </div>
                <div className="right-container">
                    {page === "Template" && <Template />}
                    {page === "Package" && <Package />}
                    {page === "Edever" && <Edever />}
                    {page === "Download" && <Download />}
                </div>
            </div>
            {help && <Help control={setHelp} />}
        </div>
    )
}

export default App
