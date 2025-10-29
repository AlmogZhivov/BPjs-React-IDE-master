import React, { useContext, useRef, useState } from "react";
import { Button, Input, Modal, Select, Space } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import "./program-saver.scss";
import IDECTX from "../../pages/IDE/IDECTX";

const {Option} = Select;

const Suffix = {
    JS: "js",
    TS: "ts",
    TXT: "txt"
}

const ProgramSaver = () => {

    const {prog} = useContext(IDECTX);
    const [suffix, setSuffix] = useState(Suffix.JS);
    const [fileName, setFileName] = useState("Default_Name");

    const aRef = useRef(null);

    const handleDownloadRequest = () => {
        Modal.confirm({
            title: "File Settings",
            content: (
                <Space direction={"vertical"} style={{width: "100%"}}>
                    <Input placeholder={"file name"} onChange={(e) => setFileName(e.target.value)}/>
                    <Select style={{width: "100%"}} onChange={(value) => setSuffix(value)} defaultValue={Suffix.JS}>
                        {Object.values(Suffix).map(s => {
                            return <Option value={s}>{s}</Option>
                        })}</Select>
                </Space>
            ),
            onOk: () => aRef?.current?.click()
        });

    }

    return (
        <div className={"download-program-button-wrapper"}>
            <a href={'data:text/plain;charset=utf-8,' + encodeURIComponent(prog)}
               download={`${fileName}.${suffix}`} ref={aRef}/>
            <Button type={"primary"}
                    size={"middle"}
                    icon={<CloudDownloadOutlined/>}
                    onClick={handleDownloadRequest}>
                Download Program
            </Button>
        </div>
    );
}

export default ProgramSaver;