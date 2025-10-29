import React, { useContext } from "react";
import { Space, Tag } from "antd";
import styled from "styled-components";
import { ReactComponent as StepOutButton } from "../../../assets/step-out-button.svg";
import { ReactComponent as StepIntoButton } from "../../../assets/step-into-button.svg";
import { ReactComponent as StepOverButton } from "../../../assets/step-over-button.svg";
import { nextSync, sendContinueReq, stepInto, stepOut, stepOver } from '../../../utils/api-service'
import { DelayedToolTip } from "../common/tooltip";
import { ReactComponent as ContinueButton } from "../../../assets/continue-button.svg";
import { ReactComponent as NextSyncStateButton } from "../../../assets/next-sync-state-button.svg";
import ProgramStateCTX from "../../state-context/StateContext";
import _ from "lodash";
import {
    CONTINUE_BUTTON,
    NEXT_SYNC_BUTTON,
    statusToActiveButtonsMap, STEP_INTO_BUTTON, STEP_OUT_BUTTON, STEP_OVER_BUTTON
} from "../../control-panels/bottom-control-panel/BottomControlPanel.component";

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonsContainer = styled(Tag)`
  padding-top: 2px;
  height: 32px;
  margin-left: 58px;
  margin-bottom: 3px;
  opacity: 1 !important;

  .debug-button-on {
    transition: all 0.2s;
    opacity: 1;
    :hover {
      cursor: pointer;
    }
  }

  .debug-button-off {
    transition: all 0.2s;
    opacity: 0.2;
  }
`

const TopDebugButtons = () => {

    const {status} = useContext(ProgramStateCTX);

    const isOn = (currButton) => {
        return _.includes(statusToActiveButtonsMap[status], currButton);
    };

    return (
        <ButtonsContainer color={"#dfe2e6"}>
            <StyledSpace direction={"horizontal"}>
                <DelayedToolTip placement="top"
                                title={"Next Sync State"}
                                color={"#2a9bc4"}
                                hoverable={isOn(NEXT_SYNC_BUTTON)}>
                    <NextSyncStateButton className={`debug-button-${isOn(NEXT_SYNC_BUTTON) ? "on" : "off"}`}
                                         onClick={() => nextSync()}/>
                </DelayedToolTip>
                <DelayedToolTip placement="top"
                                title={"Continue"}
                                color={"#2a9bc4"}
                                hoverable={isOn(CONTINUE_BUTTON)}>
                    <ContinueButton className={`debug-button-${isOn(CONTINUE_BUTTON) ? "on" : "off"}`}
                                    onClick={() => sendContinueReq()}/>
                </DelayedToolTip>
                <DelayedToolTip placement="top"
                                title={"Step Out"}
                                color={"#2a9bc4"}
                                hoverable={isOn(STEP_OUT_BUTTON)}>
                    <StepOutButton className={`debug-button-${isOn(STEP_OUT_BUTTON) ? "on" : "off"}`}
                                   onClick={() => stepOut()}/>
                </DelayedToolTip>
                <DelayedToolTip placement="top"
                                title={"Step Into"}
                                color={"#2a9bc4"}
                                hoverable={isOn(STEP_INTO_BUTTON)}>
                    <StepIntoButton className={`debug-button-${isOn(STEP_INTO_BUTTON) ? "on" : "off"}`}
                                    onClick={() => stepInto()}/>
                </DelayedToolTip>
                <DelayedToolTip placement="top"
                                title={"Step Over"}
                                color={"#2a9bc4"}
                                hoverable={isOn(STEP_OVER_BUTTON)}>
                    <StepOverButton className={`debug-button-${isOn(STEP_OVER_BUTTON) ? "on" : "off"}`}
                                    onClick={() => stepOver()}/>
                </DelayedToolTip>
            </StyledSpace>
        </ButtonsContainer>
    );
};

export default TopDebugButtons;