import React, { useEffect, useState } from "react"
import { Getreq } from "../utils/netrequest"
import Card from "./coms/Card"

function Template() {
    const [initial, setInitial] = useState(true)
    const [sample, setSample] = useState({})
    const [sqlite3, setSqlite3] = useState({})
    const [typescript, SetTypescript] = useState({})
    useEffect(() => {
        if (initial) {
            Getreq(
                "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-cli"
            ).then(res => {
                let back = {}
                back.name = res.data.full_name
                back.url = res.data.html_url
                back.updated = res.data.updated_at
                back.desp = res.data.description
                console.log(back)
                setSample(back)
            })
            Getreq(
                "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-sqlite3-cli"
            ).then(res => {
                let back = {}
                back.name = res.data.full_name
                back.url = res.data.html_url
                back.updated = res.data.updated_at
                back.desp = res.data.description
                console.log(back)
                setSqlite3(back)
            })
            Getreq(
                "https://gitee.com/api/v5/repos/HerbertHe/electron-react-antd-antv-ts-cli"
            ).then(res => {
                let back = {}
                back.name = res.data.full_name
                back.url = res.data.html_url
                back.updated = res.data.updated_at
                back.desp = res.data.description
                console.log(back)
                SetTypescript(back)
            })
            setInitial(false)
        }
    }, [initial])
    return (
        <div className="Template">
            <Card
                name={sample.name}
                url={sample.url}
                updated={sample.updated}
                desp={sample.desp}
            />
            <Card
                name={sqlite3.name}
                url={sqlite3.url}
                updated={sqlite3.updated}
                desp={sqlite3.desp}
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
