import React, { useState } from "react"
import { Getreq } from "../utils/netrequest"
import Card from "./coms/Card"
import "./template.css"

function Template() {
    const [sample, setSample] = useState({})
    const [typescript, SetTypescript] = useState({})
    Getreq(
        "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-cli"
    ).then((res) => {
        let back = {}
        back.name = res.data.full_name
        back.url = res.data.html_url
        back.updated = res.data.updated_at
        back.desp = res.data.description
        setSample(back)
    })
    Getreq(
        "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-ts-cli"
    ).then((res) => {
        let back = {}
        back.name = res.data.full_name
        back.url = res.data.html_url
        back.updated = res.data.updated_at
        back.desp = res.data.description
        SetTypescript(back)
    })
    return (
        <div className="Template">
            <Card
                name={sample.name}
                url={sample.url}
                updated={sample.updated}
                desp={sample.desp}
            />
            <Card
                name={typescript.name}
                url={typescript.url}
                updated={typescript.updated}
                desp={typescript.desp}
            />
        </div>
    )
}

export default Template
