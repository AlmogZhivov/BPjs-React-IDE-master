import { Cascader } from "antd";
import React, { useContext, useState } from "react";
import VarTableView from "./VarsTableView";
import {
    mapStateToOptions,
    mapStateToCurrThread,
} from "./VarTableContextResolver";
import ProgramStateCTX from "../state-context/StateContext";
import "./table.scss";
import { TableWrapper } from "./VarTable.styles";
import LayoutCtx from "../../pages/IDE/LayoutCtx";
import { CustomTitle } from "../title/title";
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export default function EnvSelector() {
    const programStateCtx = useContext(ProgramStateCTX);
    const optionsFromState = mapStateToOptions(programStateCtx);
    const stateCurrThread = mapStateToCurrThread(programStateCtx);
    const [cascaderValue, setCascaderValue] = useState("Please Select");
    const [functionName, setFunctionName] = useState("Please Select");
    const layoutCtx = useContext(LayoutCtx);
    const [currentThreadName, setCurrThreadName] = useState(stateCurrThread);
    const [manual, setManual] = useState(false);
    const {activeBottomPanels} = layoutCtx;


    function getEnvByThreadName(programStateCtx, selcetedThread, functionName) {
        const maybeSelectedScope = programStateCtx?.progState?.threadsAndEnvs?.filter(
            (t) => t.name == selcetedThread
        );

        var selectedScopeCopy = maybeSelectedScope &&
            maybeSelectedScope[0] &&
            maybeSelectedScope[0].env &&
            Object.entries(maybeSelectedScope[0].env).filter(e => e[1]['scopeName'] == functionName)[0]
        return selectedScopeCopy && selectedScopeCopy[1]['variables'];
    }


    const onChange = (e) => {
        if (stateCurrThread !== cascaderValue) {
            const selcetedThread = e && e[0];
            const selectedScopeName = e && e[1];
            var selectedScopeCopy = getEnvByThreadName(programStateCtx, selcetedThread);
            e && e[1] && setFunctionName(e[1])
            setCascaderValue(e.toString());
            setCurrThreadName(selcetedThread)
            setManual(true)
        }
    };
    const onChangeToggle = (e) => {
        setManual(!!!manual)
    }
    const resolveCurrFunction = (stateCurrThread) => {
        const maybeSelectedScope = programStateCtx &&
            programStateCtx.progState &&
            programStateCtx.progState.threadsAndEnvs &&
            programStateCtx.progState.threadsAndEnvs.filter(
                (t) => t.name == stateCurrThread
            );
        if (maybeSelectedScope && maybeSelectedScope[0]) return maybeSelectedScope[0]['env'][0]['variables']
        else return {}
    }
    return (
        <TableWrapper activeBottomPanels={activeBottomPanels}>
            <CustomTitle color={"white"} level={4}>
                Variables
            </CustomTitle>
            <div className="thread-selector-title">
        <span
            style={{width: "100%"}}
            className="thread-selector-inner-titles"
        >
          <span>&nbsp; Thread Selector
<span style={{color: 'gray', fontSize: '0.8em'}}>
&nbsp; [current running b-thread: {stateCurrThread}]
        </span>
          </span>
          <span style={{marginRight: "9px"}}>
            Manual Selection &nbsp;{" "}
              <Switch
                  checkedChildren={<CheckOutlined/>}
                  unCheckedChildren={<CloseOutlined/>}
                  checked={manual}
                  size="small"
                  style={{position: "relative", right: "0"}}
                  defaultChecked
                  onChange={onChangeToggle}
              />
          </span>
        </span>
                <Cascader
                    options={optionsFromState}
                    value={[cascaderValue]}
                    className="selectors"
                    onChange={onChange}
                    placeholder="Please select"
                />
            </div>
            <VarTableView
                varsToVals={manual ? getEnvByThreadName(programStateCtx, currentThreadName, functionName) : resolveCurrFunction(stateCurrThread)}
                globalVarsToVals={programStateCtx.progState.globalEnv}
            />
        </TableWrapper>
    );
}


function initThreads(stateCurrThread, cascaderValue, setCascaderValue) {
    stateCurrThread &&
    stateCurrThread !== cascaderValue &&
    setCascaderValue(stateCurrThread);
}
