import { Dropdown, Menu, Badge, Space } from "antd";
import React, { useState } from "react";
import './tags.scss'

const ThreadsNames = (tNames) => {
    return (
        tNames && (
            <Menu>
                {tNames.map((tName) => (
                    <Menu.Item>{tName}</Menu.Item>
                ))}
            </Menu>
        )
    );
};


export const ThreadsTags = ({blocked, wait, requested}) => {
    return (
        <Space size={9} style={{marginRight: "24px"}}>
            {[requested, wait, blocked].map((threads) => (
                <ThreadTag threadList={threads}/>
            ))}
        </Space>
    );
};

const ThreadTag = ({threadList}) => {
    const noMouseColor = '#fa8c18'
    const yesMouseColor = '#a56e33'
    const [color, setColor] = useState('#fa8c18')
    const isEmpty = threadList.length < 1

    return (<span className={"e_type_tag"}>
      <Dropdown disabled={isEmpty} overlay={ThreadsNames(threadList)}>
        <Badge
            onMouseEnter={() => setColor(yesMouseColor)}
            onMouseLeave={() => setColor(noMouseColor)}
            className="event-count"
            style={{backgroundColor: isEmpty ? 'grey' : color, marginRight: "8px"}}
            size="default"
            showZero
            count={threadList.length}
            overflowCount={99}
        />
      </Dropdown>
    </span>
    )
}