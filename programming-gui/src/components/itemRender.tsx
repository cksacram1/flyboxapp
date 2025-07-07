import React from "react";
import { getFormattedTime, getHour, getMin } from "../util/timeHandler";

const itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

    let backgroundColor = "";

    switch (item.group) {
        case "0": // RED LIGHT
            backgroundColor = itemContext.resizing || item.selected ? "#bd1c1c" : "#6F1111";
            break;
        case "1": // GREEN LIGHT
            backgroundColor = itemContext.resizing || item.selected ? "#2d8f15" : "#15430A";
            break;
        case "2": // WHITE LIGHT
            backgroundColor = itemContext.resizing || item.selected ? "#ededed" : "#A0A0A0";
            break;
        case "3": // IR LIGHT
         backgroundColor = itemContext.resizing || item.selected ? "#8a2be2" : "#4b0082"; // violet and indigo shades
            break;
        default:
            console.log(typeof (item.group))
            if (itemContext.selected) { backgroundColor = "#000000"; } else { backgroundColor = "#FFFFFF"; }
    }

    const borderColor = backgroundColor;

    return (
        <div
            {...getItemProps({
                style: {
                    backgroundColor,
                    borderColor,
                    color: item.group === "2" ? "black" : "white",
                    borderStyle: "solid",
                    borderWidth: itemContext.dragging ? 0 : 1,
                    borderRadius: 3,
                    borderLeftWidth: itemContext.selected ? 5 : 1,
                    borderRightWidth: itemContext.selected ? 5 : 1,
                    cursor: itemContext.resizing ? "ew-resize" : "move",
                    pointerEvents: item.id === 1000 ? "none" : "default" //for drag to create, so mousemove recognized on the row instead of item
                },
            })}
            className={"event-item-" + item.group}
            onClick={(e) => { e.stopPropagation(); console.log("click") }} // So opening context menu doesn't bubble up to cancel itself
        >
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
            {itemContext.width > 100 &&
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 10px 0px 10px",
                    }}
                >
                    <span>{getFormattedTime(item.start)}</span>
                    <span>{getFormattedTime(item.end)}</span>
                </div>
            }

            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
        </div>
    );
};

export default itemRenderer;