import styled, { css } from "styled-components";
import _ from "lodash";
import { BOTTOM_PANELS } from "../../pages/IDE/ide";
import { Typography } from 'antd';

const {Title} = Typography;

const getWidth = (activeBottomPanels) => {
    const terminalIsActive = _.includes(activeBottomPanels, BOTTOM_PANELS.CONSOLE);
    const debugIsActive = _.includes(activeBottomPanels, BOTTOM_PANELS.DEBUG);
    if (terminalIsActive && debugIsActive) {
        return css` width: 48%;`;
    } else if (debugIsActive && !terminalIsActive) {
        return css` width: 100%;`;
    } else if (!debugIsActive && terminalIsActive) {
        return css`width: 0; opacity: 0;`;
    }
};

export const TableWrapper = styled.div`
  height: 100% !important;

  ${props => getWidth(props.activeBottomPanels)}
  transition: width 0.2s ease-out, opacity 0.2s ease;
  
  table {
    box-shadow: 0 0 0 2px #1c272b;
    border-style: hidden !important;
  }

  .ant-cascader-picker {
    width: 100% !important;
  }

  .ant-table-thead > tr > th {
    color: white !important;
    background: #ff9b42 !important;
  }

  .ant-table-tbody > tr > th {
    color: black !important;
    background: #1c272b !important;
  }

  .thread-selector-title {
    color: white;
    width: 100%;
    background-color: #ff9b42;
  }
`;

export const RowLeftContainer = styled.div`
  width: 35%;
  border-right: ${props => props.bordered ? "1px solid #e9a870" : "none"};
  padding: 5px 5px 10px 5px;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const RowRightContainer = styled.div`
  width: 65%;
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const VarsTableRowContainer = styled.div`
  color: white;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e9a870;
`;

export const VarsTableContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 192px;
  overflow-y: scroll;
  border: 1px solid #ff9b42;
  border-radius: 1px;
  background: rgb(49, 49, 49);
`;

export const VarsTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TableTitlesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: -10px;
  background: #ff9b42;
`;




