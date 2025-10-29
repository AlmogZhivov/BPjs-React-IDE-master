import styled from "styled-components";
import { Typography } from "antd";
import { Tag, Input } from "antd";
import TweenOne from "rc-tween-one";
import { CloseOutlined } from "@ant-design/icons";
import React, { ReactDOM, useContext, useState } from "react";

const { Title } = Typography;

export const CustomEventRow = styled(Title)`
  color: ${(props) => props.color} !important;
  font-size: 0.9em !important;
  margin-bottom: 0px !important;
  display: inline !important;
`;

export const EventRowContainer = styled.div`
  background-color: #23272b;
  border: 1px solid orange;
  padding: 2px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

export const EventRow = ({ name,withX = false }) => {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <EventRowContainer>
      <CustomEventRow color={"#ff9e35"}> {name} </CustomEventRow>
       {withX && <CloseOutlined
        onClick={() => setVisible(false)}
        style={{ position: "relative", right: "0px", color: "#ff9e35" }}
      />}
    </EventRowContainer>
  ) : null;
};
