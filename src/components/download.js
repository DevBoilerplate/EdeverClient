import React, { useEffect, useState } from "react"
import { Empty, Table, message } from "antd"
import "./download.css"

function Download() {
    const [data, setData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {
        let dataS = []
        for (let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i)
            dataS.push({
                id: key,
                key: key,
                name: JSON.parse(window.localStorage.getItem(key)).name,
                time: JSON.parse(window.localStorage.getItem(key)).time
            })
        }
        setData(dataS.reverse())
    }, [refresh])

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

    const rowSelection = {
        selectedRowKeys,
        onChange: selectedRowKeys => setSelectedRowKeys(selectedRowKeys)
    }

    const removeItems = () => {
        selectedRowKeys.forEach(value => {
            window.localStorage.removeItem(value)
        })
        message.success("已移除选择记录")
        setSelectedRowKeys([])
        setRefresh(!refresh)
    }

    return (
        <div className="Download">
            {window.localStorage.length !== 0 && (
                <div className="data">
                    <div className="handle-data">
                        <button
                            disabled={selectedRowKeys.length === 0}
                            onClick={() => removeItems()}
                        >
                            移除记录
                        </button>
                        {selectedRowKeys.length !== 0 && (
                            <span>{`已选择${selectedRowKeys.length}项`}</span>
                        )}
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        dataSource={data}
                        columns={columns}
                        pagination={{ pageSize: 7 }}
                    />
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
