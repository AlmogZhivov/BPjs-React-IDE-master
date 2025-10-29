import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Empty, Icon } from "antd";
import ProgramStateCTX from "../state-context/StateContext";
import { CustomTitle } from "../title/title";
import { EventRow } from "../event-row/EventRow";
import { AnimatedList } from "react-animated-list";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const Container = styled.div`
  opacity: ${props => props.shouldFadePanel ? "0" : "1"};
  transition: opacity 0.2s;
  width: 90%;
`;

const Content = styled.div`
  transition: height 0.5s;
  width: 100%;
  background-color: #353d45;
  margin-top: 30px;
  border-radius: 3px;
  padding: 10px;
  height: ${props => props.componentsHeight}px;
  overflow-y: hidden;
`;

const StyledMinimizeIcon = styled(MinusOutlined)`
  color: white;
  transition: font-size 0.2s;

  &:hover {
    color: orange;
    font-size: 22px;
    cursor: pointer;
  }
`;

const StyledMaximizeIcon = styled(PlusOutlined)`
  color: white;
  transition: font-size 0.2s;

  &:hover {
    color: orange;
    font-size: 22px;
    cursor: pointer;
  }
`;

const getThreadAndCurrLineMessage = (threadAndEnv) => {
    const hasCurrLine = threadAndEnv.env[0];
    const currLineMessage = hasCurrLine ? threadAndEnv.env[0].currentLineNumber : " not running";
    return (
        <span>
            Thread
            <span style={{color: "cadetblue"}}>
                {`  ${threadAndEnv.name}  `}
            </span>
            is currently
            {hasCurrLine ? " in line " : ""}
            <span style={{color: "blanchedalmond"}}>
                {currLineMessage}
            </span>
        </span>
    )
}

const ThreadsToLinesMap = ({shouldFadePanel}) => {
    const {progState} = useContext(ProgramStateCTX);
    const [componentsHeight, setComponentsHeight] = useState(40);
    const hasContent = progState.threadsAndEnvs?.length > 0

    return (
        <Container shouldFadePanel={shouldFadePanel}>
            <Content componentsHeight={componentsHeight}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <CustomTitle level={5} color={hasContent && componentsHeight < 200 ? "#ff6961" : "white"}>
                        Threads to Lines
                    </CustomTitle>
                    {componentsHeight === 200
                        ? <StyledMinimizeIcon onClick={() => setComponentsHeight(40)}/>
                        : <StyledMaximizeIcon onClick={() => setComponentsHeight(200)}/>}
                </div>
                <div style={{height: "80%", overflowY: "auto"}}>
                    {hasContent ?
                        <AnimatedList animation={"grow"}>
                            {progState.threadsAndEnvs.map((threadAndEnv, i) => (
                                <EventRow
                                    key={i}
                                    name={getThreadAndCurrLineMessage(threadAndEnv)}
                                    clickAble={false}
                                    withX={false}
                                />
                            ))}
                        </AnimatedList> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
                </div>
            </Content>
        </Container>
    );
};

export default ThreadsToLinesMap;
