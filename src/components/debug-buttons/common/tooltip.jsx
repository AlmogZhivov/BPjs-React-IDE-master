import { Tooltip } from "antd";

export const DelayedToolTip = ({children, hoverable, ...props}) => {
    return (
        <Tooltip className={`${hoverable ? "hvr-grow" : ""}`}
                 mouseEnterDelay={1}
                 mouseLeaveDelay={0.5}
                 {...props}>
            {children}
        </Tooltip>);
};
