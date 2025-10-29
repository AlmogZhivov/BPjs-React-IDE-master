import axios from 'axios'

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
export const setUserId = (uid) => axios.defaults.headers.common['userId'] = uid;

export const baseUrl = `http://${process.env.REACT_APP_API_URL || window.location.hostname+":8080"}`;

export const sendDebugReq = (ideParams) => {
    axios.post(`${baseUrl}/bpjs/debug`,
        {
            "sourceCode": ideParams.prog,
            "skipSyncStateToggle": ideParams.syncStateMuted,
            "skipBreakpointsToggle": ideParams.bpMuted,
            "waitForExternalEvents": !ideParams.skipExternals,
            "breakpoints": ideParams.bps
        })
};

export const sendRunReq = (ideParams) => {
    axios.post(`${baseUrl}/bpjs/run`,
        {
            "sourceCode": ideParams.prog,
            "waitForExternalEvents": !ideParams.skipExternals,
        })
};

export const getEventHsitory = (from, to) => {
    axios.get(`${baseUrl}/bpjs/events?from=${from}&to=${to}`)
};

export const stop = () => {
    axios.get(`${baseUrl}/bpjs/stop`)
};

export const stepOut = () => {
    axios.get(`${baseUrl}/bpjs/stepOut`)
};

export const stepInto = () => {
    axios.get(`${baseUrl}/bpjs/stepInto`)
};

export const stepOver = () => {
    axios.get(`${baseUrl}/bpjs/stepOver`)
};

export const cont = () => {
    axios.get(`${baseUrl}/bpjs/continue`)
};

export const nextSync = () => {
    axios.get(`${baseUrl}/bpjs/nextSync`)
};

export const muteBreakpoints = (mute) => {
    axios.put(`${baseUrl}/bpjs/breakpoint`, { skipBreakpoints: mute })
};

export const muteSyncState = (mute) => {
    axios.put(`${baseUrl}/bpjs/syncStates`, { skipSyncStates: mute })
};

export const sendContinueReq = () => {
    axios.get(`${baseUrl}/bpjs/continue`)
};

export const skipExternalEvents = (skip) => {
    axios.put(`${baseUrl}/bpjs/waitExternal`, {waitForExternal: skip})
};

export const addExternalEvent = (name) => {
    axios.post(`${baseUrl}/bpjs/externalEvent`,
        {
            "externalEvent": name,
            "addEvent": true,
        })
};

export const addBreakPoint = (row) => {
    axios.post(`${baseUrl}/bpjs/breakpoint`,
        {
            "lineNumber": row,
            "stopOnBreakpoint": true,
        })
};

export const ignoreBreakPoint = (row) => {
    axios.post(`${baseUrl}/bpjs/breakpoint`,
        {
            "lineNumber": row,
            "stopOnBreakpoint": false,
        })
};

export const backToSnapShot = (time) => {
    axios.put(`${baseUrl}/bpjs/syncSnapshot`,
        {
            "snapShotTime": time
        })
};


export const removeExternalEvent = (name) => {
    axios.post(`${baseUrl}/bpjs/externalEvent`,
        {
            "externalEvent": name,
            "addEvent": false,
        })
};
