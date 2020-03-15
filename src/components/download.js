import React, { useEffect } from "react"
import { Empty } from "antd"
import "./download.css"

function Download() {
    useEffect(() => {}, [])
    return (
        <div className="Download">
            <div className="no-data">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        </div>
    )
}

export default Download
