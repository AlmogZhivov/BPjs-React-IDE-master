import React, { useContext } from "react";
import { Space, Tag } from "antd";
import styled from "styled-components";
import { ReactComponent as DebugButton } from "../../../assets/debug-button.svg";
import IDECTX from '../../../pages/IDE/IDECTX';
import { ReactComponent as RunButton } from "../../../assets/run-button.svg";
import { ReactComponent as StopButton } from "../../../assets/stop-button.svg";
import { ReactComponent as MuteBreakpointsButton } from "../../../assets/mute-breakpoings-button.svg";
import { ReactComponent as UnMuteBreakpointsButton } from "../../../assets/unmute-breakpoints-button.svg";
import { ReactComponent as MuteSyncStateButton } from "../../../assets/mute-sync-state-button.svg";
import { ReactComponent as UnMuteSyncStateButton } from "../../../assets/unmute-sync-state-button.svg";
import { ReactComponent as WaitForExternalEventsButton } from "../../../assets/external-events-on-button.svg";
import { ReactComponent as SkipForExternalEventsButton } from "../../../assets/external-events-off-button.svg";
import {
    muteBreakpoints,
    muteSyncState,
    sendDebugReq,
    sendRunReq,
    skipExternalEvents,
    stop
} from '../../../utils/api-service'
import { DelayedToolTip } from "../../debug-buttons/common/tooltip";
import {
    DEBUG_BUTTON,
    RUN_BUTTON,
    statusToActiveButtonsMap, STOP_BUTTON, TOGGLE_BP_BUTTON, TOGGLE_EXTERNALS_BUTTON, TOGGLE_SYNC_BUTTON
} from "../../control-panels/bottom-control-panel/BottomControlPanel.component";
import ProgramStateCTX from "../../state-context/StateContext";
import _ from "lodash";
import { useConsoleText } from "../../console/useConsoleText";

const StyledSpace = styled(Space)`
  margin-right: 5px;
  margin-left: -10px;
  margin-top: 30px;
  height: 100%;
  padding: 10px;

  .debug-button-on {
    opacity: 1;
    transition: all 0.2s;

    :hover {
      cursor: pointer;
    }
  }

  .debug-button-off {
    transition: all 0.2s;
    opacity: 0.2;
  }
`;

const ButtonsContainer = styled(Tag)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  width: 35px;
  opacity: 1 !important;
`

const LeftDebugButtons = () => {
        const ideProps = useContext(IDECTX);
        const {resetState, status} = useContext(ProgramStateCTX);

        const isOn = (currButton) => {
            return _.includes(statusToActiveButtonsMap[status], currButton);
        };

        const handleDebug = () => {
            sendDebugReq(ideProps);
            resetState();
        }

        const handleStop = () => {
            stop();
            resetState();
        }

        const handleMuteOrUnmuteBp = (mute) => {
            ideProps.setBpMuted(mute);
            muteBreakpoints(mute);
        }

        const handleMuteOrUnmuteSyncState = (mute) => {
            ideProps.setSyncStateMuted(mute);
            muteSyncState(mute);
        }

        const handleSkipOrWaitExternalEvents = (skip) => {
            ideProps.setSkipExternals(skip);
            skipExternalEvents(skip);
        }

        const getDebugRunButtons = () => {
            return (
                <ButtonsContainer color={"#dfe2e6"}>
                    <Space style={{display: "flex", justifyContent: "center", alignItems: "center"}} direction={"vertical"}
                           size={10}>
                        <DelayedToolTip placement="top"
                                        title={"Debug"}
                                        color={"#7cba59"}
                                        hoverable={isOn(DEBUG_BUTTON)}>
                            <DebugButton className={`debug-button-${isOn(DEBUG_BUTTON) ? "on" : "off"}`}
                                         onClick={handleDebug}/>
                        </DelayedToolTip>
                        <DelayedToolTip placement="top"
                                        title={"Run"}
                                        color={"#7cba59"}
                                        hoverable={isOn(RUN_BUTTON)}>
                            <RunButton className={`debug-button-${isOn(RUN_BUTTON) ? "on" : "off"}`}
                                       onClick={() => sendRunReq(ideProps)}/>
                        </DelayedToolTip>
                        <DelayedToolTip placement="top"
                                        title={"Stop"}
                                        color={"#c45749"}
                                        hoverable={isOn(STOP_BUTTON)}>
                            <StopButton className={`debug-button-${isOn(STOP_BUTTON) ? "on" : "off"}`}
                                        onClick={handleStop}/>
                        </DelayedToolTip>
                    </Space>
                </ButtonsContainer>
            );
        }

        const getToggles = () => {
            return (
                <ButtonsContainer color={"#dfe2e6"}>
                    <Space style={{display: "flex", justifyContent: "center", alignItems: "center"}} direction={"vertical"}
                           size={10}>
                        <DelayedToolTip placement="top"
                                        title={`${ideProps.bpMuted ? "unmute" : "mute"} breakpoints `}
                                        color={"#c45749"}
                                        hoverable={isOn(TOGGLE_BP_BUTTON)}>
                            {ideProps.bpMuted
                                ?
                                <UnMuteBreakpointsButton className={`debug-button-${isOn(TOGGLE_BP_BUTTON) ? "on" : "off"}`}
                                                         onClick={() => handleMuteOrUnmuteBp(false)}/>
                                : <MuteBreakpointsButton className={`debug-button-${isOn(TOGGLE_BP_BUTTON) ? "on" : "off"}`}
                                                         onClick={() => handleMuteOrUnmuteBp(true)}/>}
                        </DelayedToolTip>
                        <DelayedToolTip placement="top"
                                        title={`${ideProps.syncStateMuted ? "unmute" : "mute"} sync state `}
                                        color={"#c45749"}
                                        hoverable={isOn(TOGGLE_SYNC_BUTTON)}>
                            {ideProps.syncStateMuted
                                ?
                                <UnMuteSyncStateButton className={`debug-button-${isOn(TOGGLE_SYNC_BUTTON) ? "on" : "off"}`}
                                                       onClick={() => handleMuteOrUnmuteSyncState(false)}/>
                                : <MuteSyncStateButton className={`debug-button-${isOn(TOGGLE_SYNC_BUTTON) ? "on" : "off"}`}
                                                       onClick={() => handleMuteOrUnmuteSyncState(true)}/>}
                        </DelayedToolTip>

                        <DelayedToolTip placement="top"
                                        title={`${ideProps.skipExternals ? "wait for" : "dismiss"} external events `}
                                        color={"#c45749"}
                                        hoverable={isOn(TOGGLE_EXTERNALS_BUTTON)}>
                            {ideProps.skipExternals
                                ? <WaitForExternalEventsButton
                                    className={`debug-button-${isOn(TOGGLE_EXTERNALS_BUTTON) ? "on" : "off"}`}
                                    onClick={() => handleSkipOrWaitExternalEvents(false)}/>
                                : <SkipForExternalEventsButton
                                    className={`debug-button-${isOn(TOGGLE_EXTERNALS_BUTTON) ? "on" : "off"}`}
                                    onClick={() => handleSkipOrWaitExternalEvents(true)}/>}
                        </DelayedToolTip>
                    </Space>
                </ButtonsContainer>
            );
        }

        return (
            <StyledSpace direction={"vertical"} size={20}>
                {getDebugRunButtons()}
                {getToggles()}
            </StyledSpace>
        );
    }
;

export default LeftDebugButtons;
