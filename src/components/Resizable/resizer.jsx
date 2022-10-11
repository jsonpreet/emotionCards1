import * as React from "react";

const rowSizeBase = {
  width: "100%",
  height: "10px",
  top: "0px",
  left: "0px",
  cursor: "row-resize",
};

const colSizeBase = {
  width: "16px",
  height: "100%",
  top: "0px",
  left: "0px",
  cursor: "col-resize",
};

const edgeBase = {
  width: "20px",
  height: "20px",
  position: "absolute",
};

const styles = {
  top: {
    ...rowSizeBase,
    top: "-5px",
  },
  right: {
    ...colSizeBase,
    left: undefined,
    right: "0px",
  },
  bottom: {
    ...rowSizeBase,
    top: undefined,
    bottom: "-5px",
  },
  left: {
    ...colSizeBase,
    left: "0px",
  },
  topRight: {
    ...edgeBase,
    right: "-10px",
    top: "-10px",
    cursor: "ne-resize",
  },
  bottomRight: {
    ...edgeBase,
    right: "-10px",
    bottom: "-10px",
    cursor: "se-resize",
  },
  bottomLeft: {
    ...edgeBase,
    left: "-10px",
    bottom: "-10px",
    cursor: "sw-resize",
  },
  topLeft: {
    ...edgeBase,
    left: "-10px",
    top: "-10px",
    cursor: "nw-resize",
  },
};



export class Resizer extends React.PureComponent {
  onMouseDown = (e) => {
    this.props.onResizeStart(e, this.props.direction);
  };

  onTouchStart = (e) => {
    this.props.onResizeStart(e, this.props.direction);
  };

  render() {
    return (
      <div
        className={this.props.className || ""}
        style={{
          position: "absolute",
          userSelect: "none",
          ...styles[this.props.direction],
          ...(this.props.replaceStyles || {}),
        }}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      >
        {this.props.children}
      </div>
    );
  }
}
