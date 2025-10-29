import { Client } from "@stomp/stompjs";
import React from "react";
import ProgramStateCTX from "./StateContext";
import { mapDebugState, mapProgramStatus, mapTerminalState } from "./StateMapper";
import { setUserId } from '../../utils/api-service'

const initialState = {
    progState: "empty state",
    terminalState: {outputs: null},
    status: "STOP"
};

export default class StateManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this.client = new Client();
        this.client.configure({
            brokerURL: `ws://${process.env.REACT_APP_API_URL || window.location.hostname+":8080"}/ws`,
            onConnect: (msg) => {

                setUserId(msg.headers['user-name'])

                this.client.subscribe("/user/console/update", (message) => {
                    if (message && message.body)
                        this.setState({terminalState: mapTerminalState(JSON.parse(message.body))});
                });

                this.client.subscribe("/user/state/update", (message) => {
                    if (message && message.body) {
                        this.setState({progState: mapDebugState(JSON.parse(message.body))});
                    }
                });

                this.client.subscribe("/user/program/update", (message) => {
                    if (message && message.body) {
                        this.setState({status: mapProgramStatus(JSON.parse(message.body))});
                    }
                });

                this.client.publish({destination: "/bpjs/subscribe"});
            }
        });

        this.client.activate();
    }

    resetState = () => {
        this.setState(initialState);
    };

    render() {
        return (
            <ProgramStateCTX.Provider
                value={{
                    progState: this.state.progState,
                    terminalState: this.state.terminalState,
                    status: this.state.status,
                    resetState: this.resetState
                }}
            >
                {this.props.children}
            </ProgramStateCTX.Provider>
        );
    }
}
