export const mapStateToOptions = ({ progState }) => {
    return progState.threadsAndEnvs && progState.threadsAndEnvs.map(t => {
        return {
            value: t.name,
            label: t.name,
            children: Object.keys(t.env).map(envName => {
                return {
                    value: t.env[envName]['scopeName'],
                    label: t.env[envName]['scopeName']+ ' [' + t.env[envName]['currentLineNumber']+']',
                }
            })
        }
    })

}

export const mapStateToCurrThread = ({ progState }) => {
    return progState && progState.currentRunningThread && progState.currentRunningThread.name
}
