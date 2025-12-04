import React, { useContext, useState } from "react";
import ProgramStateCTX from "../state-context/StateContext";
import styled from "styled-components";
import { CustomTitle } from "../title/title";
import * as API from "../../utils/api-service";
import { EventRow } from "../event-row/EventRow";
import { AnimatedList } from "react-animated-list";
import { Empty, Badge } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const TraceContainer = styled.div`
  transition: min-height 0.5s, max-height 0.5s;
  opacity: ${props => props.shouldFadePanel ? "0" : "1"};
  width: 90%;
  min-height: ${props => props.componentsHeight}px;
  max-height: ${props => props.componentsHeight}px;
  overflow: hidden;
  background-color: #353d45;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 3px;
  padding: 10px;

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

  .ant-popover-buttons .ant-btn-primary {
    background: #ff9e35;
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

const Trace = ({ shouldFadePanel }) => {
  const { progState } = useContext(ProgramStateCTX);
  const [componentsHeight, setComponentsHeight] = useState(200);
  const hasContent = progState.eventsHistory?.length > 0
  return (
    <TraceContainer shouldFadePanel={shouldFadePanel} componentsHeight={componentsHeight}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <CustomTitle level={5} color={hasContent && componentsHeight < 200 ? "#ff6961" : "white"}>
          Trace
        </CustomTitle>
        {componentsHeight === 200
          ? <StyledMinimizeIcon onClick={() => setComponentsHeight(40)} />
          : <StyledMaximizeIcon onClick={() => setComponentsHeight(200)} />}
      </div>
      <div style={{ height: "75%", overflowY: "auto" }}>
        {progState.currentEvent ?
          (<EventRow alertDot name={progState.currentEvent} />) :
          null
        }
        {(!progState.eventsHistory || (progState.eventsHistory && progState.eventsHistory.length === 0)) && !progState.currentEvent ?
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
          <AnimatedList animation={"grow"}>
            {progState.eventsHistory.map((eh, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <EventRow
                  name={eh.name}
                  clickAble
                  withX
                  withConfirmation
                  afterConfirmMsg={`Back To The Time Where \n  Event: \"${eh.name}\" \n Came Out To The World!`}
                  confirmMsg={`Are you sure you want to cancel the event \"${eh.name}\" selection?`}
                  onClick={() => API.backToSnapShot(eh.timeStamp)}
                />
                <button
                  style={{ marginLeft: '5px', fontSize: '10px', padding: '2px 5px', cursor: 'pointer' }}
                  onClick={() => API.previewSnapShot(eh.timeStamp)}
                >
                  Preview
                </button>
              </div>
            ))}
          </AnimatedList>}
      </div>
      <div style={{ textAlign: 'center', marginTop: '5px' }}>
        <button onClick={() => API.restoreSnapShot()} style={{ cursor: 'pointer', color: 'white', background: 'transparent', border: '1px solid white', borderRadius: '3px' }}>
          Return to Live
        </button>
      </div>
    </TraceContainer>
  );
}
  ;

export default Trace;
