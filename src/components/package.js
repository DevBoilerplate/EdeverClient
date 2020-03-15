import React, { useEffect, useState } from "react"
import { Select, Empty } from "antd"
import { Getreq } from "../utils/netrequest"
import "./package.css"
const { Option } = Select

function Package() {
    const [pack, setPack] = useState("Sample")
    const [datas, setDatas] = useState([])
    useEffect(() => {
        switch (pack) {
            case "Sample": {
                Getreq(
                    "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-cli/releases?page=1&per_page=20"
                ).then(res => {
                    if (res.status === 200) setDatas(res.data.reverse())
                })
                break
            }
            case "Sqlite3": {
                Getreq(
                    "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-sqlite3-cli/releases?page=1&per_page=20"
                ).then(res => {
                    if (res.status === 200) setDatas(res.data.reverse())
                })
                break
            }
            case "TypeScript": {
                Getreq(
                    "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-ts-cli/releases?page=1&per_page=20"
                ).then(res => {
                    if (res.status === 200) setDatas(res.data.reverse())
                })
                break
            }
            default: {
                Getreq(
                    "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-cli/releases?page=1&per_page=20"
                ).then(res => {
                    if (res.status === 200) setDatas(res.data.reverse())
                })
                break
            }
        }
    }, [pack])
    const changePack = e => {
        setPack(e)
    }
    return (
        <div className="Package">
            <div className="top">
                <div className="name">{pack}</div>
                <Select defaultValue="Sample" onChange={changePack}>
                    <Option value="Sample">Sample</Option>
                    <Option value="Sqlite3">Sqlite3</Option>
                    <Option value="TypeScript">TypeScript</Option>
                </Select>
            </div>
            <div className="bottom">
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
        </div>
    )
}

export default Package
