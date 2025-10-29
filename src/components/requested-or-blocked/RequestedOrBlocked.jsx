import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CustomTitle } from "../title/title";
import ProgramStateCTX from "../state-context/StateContext";
import { EventRow } from "../event-row/EventRow";
import { Empty, Space, Tag } from 'antd';
import './events_status.scss'
import { groupByThreads } from './aggregator'
import { AnimatedList } from "react-animated-list";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const RequestedOrBlockedContainer = styled.div`
  opacity: ${props => props.shouldFadePanel ? "0" : "1"};
  width: 90%;
  transition: opacity 0.2s, min-height 0.5s, max-height 0.5s;
  min-height: ${props => props.componentsHeight}px;
  max-height: ${props => props.componentsHeight}px;
  background-color: #353d45;
  margin-top: 30px;
  border-radius: 3px;
  padding: 10px;
  overflow: hidden;

  ::-webkit-scrollbar {
    height: 12px;
    width: 6px;
    background: #23272b;
  }

  ::-webkit-scrollbar-thumb {
    background: #ff9e35;
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.75);
  }
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

const RequestedOrBlocked = ({shouldFadePanel}) => {
    const {progState} = useContext(ProgramStateCTX);
    const eventsGroupedByThreads = groupByThreads(progState)
    const [componentsHeight, setComponentsHeight] = useState(200);
    const hasContent = eventsGroupedByThreads?.length > 0
    return (
        <RequestedOrBlockedContainer shouldFadePanel={shouldFadePanel} componentsHeight={componentsHeight}>
            <span className={'box-header'}>
                    <CustomTitle level={5} color={hasContent && componentsHeight < 200 ? "#ff6961" : "white"}>
                  Events Status
                  </CustomTitle>
                <Space>
                    {componentsHeight === 200 &&
                    <span className={'event-tag'}>
                        <Tag color="orange"> Requested | Wait For | Blocked </Tag>
                    </span>}
                    {componentsHeight === 200
                        ? <StyledMinimizeIcon onClick={() => setComponentsHeight(40)}/>
                        : <StyledMaximizeIcon onClick={() => setComponentsHeight(200)}/>}
                </Space>
              </span>
            <div style={{height: "85%", overflowY: "auto", padding: "2px"}}>
                {eventsGroupedByThreads?.length > 0 ?
                    <AnimatedList animation={"grow"}>
                        {eventsGroupedByThreads.map((ee, i) => (
                            <EventRow
                                key={i}
                                withTags
                                tagsData={ee}
                                name={ee.name}
                            />
                        ))}
                    </AnimatedList> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
            </div>
        </RequestedOrBlockedContainer>
    );
}

export default RequestedOrBlocked;
