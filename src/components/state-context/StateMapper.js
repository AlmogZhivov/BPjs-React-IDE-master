export const mapDebugState = (stateFromServer) => {
    return {
        threadsAndEnvs: resolveThreadAndEnvs(stateFromServer),
        currentRunningThread: { name: stateFromServer.currentRunningBT },
        currentLine: stateFromServer.currentLineNumber,
        eventsHistory: resolveEventsHistory(stateFromServer),
        externalEvents: resolveExternalEvents(stateFromServer),
        eventsInfo: resolveEventsInfo(stateFromServer),
        currentEvent: resolveCurrentEventSelection(stateFromServer),
        globalEnv: stateFromServer.globalEnv
    }
}


export const mapTerminalState = (terminalStateFromServer) => {
    return {
        outputs: terminalStateFromServer
    }
}

export const mapProgramStatus = (programStatus) => {
    return programStatus.status;
}

function resolveCurrentEventSelection(stateFromServer) {
    stateFromServer.eventsStatus && console.log(stateFromServer.eventsStatus.currentEvent)
    return stateFromServer &&
        stateFromServer.eventsStatus &&
        stateFromServer.eventsStatus.currentEvent &&
        stateFromServer.eventsStatus.currentEvent.name 
}

function resolveThreadAndEnvs(stateFromServer) {
    return stateFromServer && stateFromServer.bThreadInfoList &&
        stateFromServer.bThreadInfoList.map(t => {
            return { name: t && t.name, env: t && t.env }
        })
}

function resolveEventsHistory(stateFromServer) {
    return Object.entries(stateFromServer.eventsHistory).map(([key, value]) => { return { name: value.name, timeStamp: key } })
}

function resolveExternalEvents(stateFromServer) {
    return stateFromServer.eventsStatus &&
        stateFromServer.eventsStatus.externalEvents &&
        Object.entries(stateFromServer.eventsStatus.externalEvents).map(([key, value]) => { return { name: value.name } })
}

function resolveEventsInfo(stateFromServer) {
    return {
        events: {
            blocked: stateFromServer && stateFromServer.eventsStatus && stateFromServer.eventsStatus.blocked && stateFromServer.eventsStatus.blocked.map(e => e.name),
            wait: stateFromServer && stateFromServer.eventsStatus && stateFromServer.eventsStatus.wait && stateFromServer.eventsStatus.wait.map(e => e.name),
            requested: stateFromServer && stateFromServer.eventsStatus && stateFromServer.eventsStatus.requested && stateFromServer.eventsStatus.requested.map(e => e.name)
        },
        threadEvents: stateFromServer &&
            stateFromServer.bThreadInfoList.map(t => {
                return {
                    name: t.name,
                    blocked: t.blocked && t.blocked.map(e => e.name),
                    requested: t.requested && t.requested.map(e => e.name),
                    wait: t.wait && t.wait.map(e => e.name),
                }
            })
    }
}

