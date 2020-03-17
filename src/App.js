import React, { useState, useEffect } from "react"
import "./App.css"
import { Progress } from "antd"
import Template from "./components/template"
import Package from "./components/package"
import Edever from "./components/edever"
import Help from "./components/help"
import Download from "./components/download"
import { IconFont } from "./components/iconfont"

function App() {
    const [page, setPage] = useState("Template")
    const [help, setHelp] = useState(false)
    const [update, setUpdate] = useState(false)
    const [updateInfo, setUpdateInfo] = useState({})
    const [progress, setProgress] = useState(false)
    const [percent, setPercent] = useState(0)
    const [initial, setInitial] = useState(true)

    useEffect(() => {
        const ipcRenderer = window.electron.ipcRenderer
        if (initial) {
            ipcRenderer.send("update")
            setInitial(false)
        }
        ipcRenderer.on("message", (event, { message, data }) => {
            if (message === "update-available") {
                setProgress(true)
                setUpdateInfo(data)
            }

            if (message === "update-downloaded") {
                setProgress(false)
                const date = new Date()
                const timestamp = date.getTime().toString()
                const time = date.toLocaleString().replace(" ", "-")
                const content = {
                    name: updateInfo.path,
                    tag: updateInfo.version,
                    time: time
                }
                window.localStorage.setItem(timestamp, JSON.stringify(content))
            }

            if (message === "downloadProgress") {
                setPercent(Math.round(data.percent))
            }

            if (message === "isUpdateNow") {
                setUpdate(true)
            }
        })
    }, [initial, updateInfo])

    const minimizeWin = () => {
        let ipcRender = window.electron.ipcRenderer
        ipcRender.send("minimize-window")
    }

    const closeWin = () => {
        let ipcRender = window.electron.ipcRenderer
        ipcRender.send("window-all-closed")
    }
    const gotoUpdate = () => {
        setProgress(false)
        let ipcRender = window.electron.ipcRenderer
        ipcRender.send("updateNow")
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
                    {progress && (
                        <div className="progress">
                            <Progress
                                percent={percent}
                                status={percent === 100 ? "success" : "active"}
                            />
                        </div>
                    )}
                    {page === "Template" && (
                        <div className="func-container">
                            <Template />
                        </div>
                    )}
                    {page === "Package" && (
                        <div className="func-container">
                            <Package />
                        </div>
                    )}
                    {page === "Edever" && (
                        <div className="func-container">
                            <Edever />
                        </div>
                    )}
                    {page === "Download" && (
                        <div className="func-container">
                            <Download />
                        </div>
                    )}
                </div>
            </div>
            {help && <Help control={setHelp} />}
            {update && (
                <div className="go-update">
                    <div className="container">
                        <div className="header">
                            检测到可更新版本 {updateInfo.version}
                        </div>
                        <div className="body">
                            <div className="info">
                                文件名: {updateInfo.path}
                            </div>
                            <div className="info">
                                更新日期: {updateInfo.releaseDate}
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="btn1" onClick={() => gotoUpdate()}>
                                现在更新
                            </div>
                            <div
                                className="btn2"
                                onClick={() => {setUpdate(false); setProgress(false)}}
                            >
                                暂不更新
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
