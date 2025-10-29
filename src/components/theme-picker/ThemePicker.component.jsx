import React, { useContext } from "react";
import { Select } from "antd";
import LayoutCtx from "../../pages/IDE/LayoutCtx";
import "./ThemePicker.scss";
import { editorThemes } from "../code-editor/editor-setting";

const {Option, OptGroup} = Select;

const ThemePicker = () => {

    const {currTheme, setCurrTheme} = useContext(LayoutCtx);

    const handleThemeChange = (pickedTheme) => {
        setCurrTheme(pickedTheme);
    };

    return (
        <Select style={{width: 140, marginLeft: "10px"}} onChange={handleThemeChange} defaultValue={currTheme}>
            <OptGroup label={"Dark"}>
                {editorThemes.dark.sort().map(theme => <Option value={theme}>{theme}</Option>)}
            </OptGroup>
            <OptGroup label={"Light"}>
                {editorThemes.light.sort().map(theme => <Option value={theme}>{theme}</Option>)}
            </OptGroup>
        </Select>
    );
}

export default ThemePicker;