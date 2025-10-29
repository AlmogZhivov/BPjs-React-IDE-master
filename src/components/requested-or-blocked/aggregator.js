
export const groupByThreads = (progStateCTX) => {

    const events = (progStateCTX.eventsInfo && progStateCTX.eventsInfo.events) ? progStateCTX.eventsInfo.events : { blocked: [], requested: [], wait: [] }

    const threadsEventsStatus =progStateCTX.eventsInfo &&  progStateCTX.eventsInfo.threadEvents

    if (!events || !threadsEventsStatus) return

    const totalEvents = [... new Set([].concat(events.requested))]

    const x =  totalEvents.map(eName => {
        return {
            name: eName,
            blocked: getThreadsFor('blocked', eName, threadsEventsStatus),
            wait: getThreadsFor('wait', eName, threadsEventsStatus),
            requested: getThreadsFor('requested', eName, threadsEventsStatus)
        }
    })
    return x
}
const getThreadsFor = (eventType, eName, threadsEventsStatus) => {
    let tNames = []
    threadsEventsStatus.map(tInfo =>tInfo[eventType] && tInfo[eventType].includes(eName) && tNames.push(tInfo.name))
    return tNames
}
