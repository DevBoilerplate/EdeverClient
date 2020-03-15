import React, { useEffect, useState } from "react"
import { Empty, Table } from "antd"
import "./download.css"

function Download() {
    const [data, setData] = useState([])
    useEffect(() => {
        let dataS = []
        for (let i = 0; i < window.localStorage.length; i++) {
            let aData = {}
            let key = window.localStorage.key(i)
            let item = window.localStorage.getItem(key)
            aData.id = key
            aData.key = key
            aData.name = JSON.parse(item).name
            aData.time = JSON.parse(item).time
            dataS.push(aData)
        }
        setData(dataS.reverse())
    }, [])

    const columns = [
        {
            title: "id",
            dataIndex: "id"
        },
        {
            title: "文件名",
            dataIndex: "name"
        },
        {
            title: "时间",
            dataIndex: "time"
        }
    ]

    return (
        <div className="Download">
            {window.localStorage.length !== 0 && (
                <div className="data">
                    <Table dataSource={data} columns={columns} />
                </div>
            )}

            {window.localStorage.length === 0 && (
                <div className="no-data">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
            )}
        </div>
    )
}

export default Download
