import React, { useEffect, useState } from "react"
import { Getreq } from "../utils/netrequest"
import { Empty } from "antd"
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
                        <div>{item.assets[0]["browser_download_url"]}</div>
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
