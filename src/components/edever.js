import React, { useEffect, useState } from "react"
import { Getreq } from "../utils/netrequest"
import { Empty, message } from "antd"
import { IconFont } from "./iconfont"
import "./edever.css"

function Edever() {
    const [datas, setDatas] = useState([])
    useEffect(() => {
        Getreq(
            "https://gitee.com/api/v5/repos/HerbertHe/Edever/releases?page=1&per_page=20"
        ).then(res => {
            if (res.status === 200) setDatas(res.data.reverse())
        })
    }, [])
    const getDownload = (name, url) => {
        message.info(`前往下载${name}`)
        const shell = window.electron.shell
        shell.openExternal(url)
        const date = new Date()
        const timestamp = date.getTime().toString()
        const time = date.toLocaleString().replace(" ", "-")
        const content = {
            name: name,
            time: time
        }
        window.localStorage.setItem(timestamp, JSON.stringify(content))
    }
    return (
        <div className="Edever">
            {datas.length !== 0 &&
                datas.map(item => (
                    <div key={item.id} className="pack-items">
                        <div className="header">
                            <div className="container">
                                {item.prerelease && (
                                    <span className="pre">Pre-release</span>
                                )}
                                {!item.prerelease && (
                                    <span className="release">Release</span>
                                )}
                                <div className="name">{item.name}</div>
                            </div>

                            <div className="tag">Tag: {item.tag_name}</div>
                        </div>

                        <div>创建时间: {item.created_at}</div>

                        {item.assets.map(i => (
                            <div
                                className="edevers"
                                key={i["browser_download_url"]}
                            >
                                {i["name"] && (
                                    <span>
                                        <span>
                                            <span style={{ color: "#3c40c6" }}>
                                                {i["name"].replace(".zip", "")}
                                            </span>
                                            :{" "}
                                            <span>
                                                {i["browser_download_url"]}
                                            </span>
                                        </span>
                                        <button
                                            className="download"
                                            onClick={() =>
                                                getDownload(
                                                    i["name"],
                                                    i["browser_download_url"]
                                                )
                                            }
                                        >
                                            <IconFont
                                                type="icon-down"
                                                style={{ fontSize: 30 }}
                                            />
                                        </button>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            {datas.length === 0 && (
                <div className="no-data">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    )
}

export default Edever
