import React from "react";
import { Empty, Tag, Tooltip } from "antd";
import ReactJson from "react-json-view";
import {
    RowLeftContainer,
    RowRightContainer, TableTitlesContainer,
    VarsTableContainer,
    VarsTableContentContainer,
    VarsTableRowContainer
} from "./VarTable.styles";
import { CustomTitle } from "../title/title";
import './table.scss'

/***
 * Vars to vals is a map holds the follwing keys:
 * varName: Varaialbe name
 * varVal: Varaialbe Value
 * isJson: the only type we supports is an object, all other types will display their native toString representation
 */


export default function VarTableView({varsToVals, globalVarsToVals}) {
    const isStr = (ms) => typeof ms === "string" || ms instanceof String;
    const isNum = (ms) => typeof ms === "number" || ms instanceof Number;
    const isObject = (ms) => typeof ms === "object" || ms instanceof Object;
    const isArray = (ms) => typeof ms === "object" && "join" in ms && typeof ms.join === "function" &&
        "length" in ms && typeof ms.length === "number";

    const getVarValue = (v) => {
        return (isStr(v) || isNum(v)) ? v : isObject(v) ?
            <ReactJson collapsed={true}
                       name={null}
                       theme={"railscasts"}
                       displayObjectSize={false}
                       enableClipboard={false}
                       displayDataTypes={false}
                       src={v}/> : "null";
    };

    const tryParse = json => {
        try {
            return json === "null" ? json : JSON.parse(json);
        } catch (e) {
            return json
        }
    };

    const varToValRows =
        !isStr(varsToVals) &&
        varsToVals &&
        Object.keys(varsToVals).map(k => {
            return {
                varName: k,
                varVal: getVarValue(tryParse(varsToVals[k])),
            };
        });

    const globalVarToValRows =
        !isStr(globalVarsToVals) &&
        globalVarsToVals &&
        Object.keys(globalVarsToVals).map(k => {
            return {
                varName: k,
                varVal: getVarValue(tryParse(globalVarsToVals[k])),
                isGlobal: true
            };
        });

    const buildRows = (rows) => {
        return rows.map(row => {
            return (
                <VarsTableRowContainer>
                    <RowLeftContainer bordered={true}>
                        {row.isGlobal && <Tag color={"geekblue"}>G</Tag>}
                        <Tooltip title={row.varName}>
                            {row.varName}
                        </Tooltip>
                    </RowLeftContainer>
                    <RowRightContainer>{row.varVal}</RowRightContainer>
                </VarsTableRowContainer>
            );
        })
    };

    const buildTitleRow = () => {
        return (
            <TableTitlesContainer>
                <RowLeftContainer bordered={false}>
                    <CustomTitle level={5} color={"white"}>Var</CustomTitle>
                </RowLeftContainer>
                <RowRightContainer>
                    <CustomTitle level={5} color={"white"}>Val</CustomTitle>
                </RowRightContainer>
            </TableTitlesContainer>
        );
    };

    return (
        <VarsTableContainer>
            {buildTitleRow()}
            <VarsTableContentContainer>
                {globalVarToValRows && varToValRows
                    ? buildRows([...varToValRows, ...globalVarToValRows])
                    : <Empty style={{paddingTop: "30px"}} description={"No variables have been found yet"}/>};
            </VarsTableContentContainer>
        </VarsTableContainer>
    );
}

