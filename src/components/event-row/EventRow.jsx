import styled from "styled-components";

import { Tag, Input, Typography, Badge, Popconfirm, message } from "antd";
import {ThreadsTags} from "./ThreadsTag";
import { CloseOutlined } from "@ant-design/icons";
import React, { ReactDOM, useContext, useState } from "react";
import './row.scss'
const { Title } = Typography;

export const CustomEventRow = styled(Title)`
  color: ${(props) => props.color} !important;
  font-size: 0.9em !important;
  margin-bottom: 0px !important;
  display: inline !important;
`;

export const EventRowContainer = styled.div`
  background-color: #23272b;
  cursor: ${(props) => (props.clickAble ? "pointer" : "default")};
  border: 1px solid orange;
  padding: 2px;
  margin-bottom: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
function confirm(afterConfirmMsg,cb) {
  message.success(afterConfirmMsg);
  cb()
}

function cancel(e) {
  message.error("Aborted");
}
export const EventRow = ({
  name,
  withX = false,
  onClick = () => {},
  withTags = false,
  tagsData ={},
  clickAble = false,
  withConfirmation = false,
  confirmMsg = "",
  afterConfirmMsg = "",
  alertDot = false
}) => {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <Popconfirm
      title={confirmMsg}
      onConfirm={() => confirm(afterConfirmMsg, onClick)}
      onCancel={cancel}
      okText="Yes"
      disabled = {!withConfirmation}
      cancelText="No"
    >
      <EventRowContainer onClick={() => clickAble && !withConfirmation && onClick()} clickAble={clickAble}>
        <CustomEventRow color={"#ff9e35"}>
          
           &nbsp; {name} 
            
        </CustomEventRow>
        {(!withX && alertDot) ?  <span className="dot">  </span>: null} 
        {(withX && !alertDot) &&  (
          <CloseOutlined
            onClick={() => setVisible(false)}
            style={{ color: "#ff9e35" }}
          />
        )}
       {withTags ?
       <span style={{padding: '8px 0px 8px 0px'}}>
        <ThreadsTags requested={tagsData.requested} blocked={tagsData.blocked} wait={tagsData.wait} />
        </span>
         : null
       }
      </EventRowContainer>
    </Popconfirm>
  ) : null;
};
