import React, { Component } from "react";
import "./Die.css";
import red1 from "./red-1.jpg"
import red2 from "./red-2.jpg"
import red3 from "./red-3.jpg"
import red4 from "./red-4.jpg"
import red5 from "./red-5.jpg"
import red6 from "./red-6.jpg"

class Die extends Component {
  constructor(props) {
    super(props);
    this.handleToggleLocked = this.handleToggleLocked.bind(this);
  }

  handleToggleLocked() {
    this.props.toggleLocked(this.props.idx);
  }

  render() {
    return (
      <button
        className={this.props.locked ? "Die Die-locked" : "Die"}
        onClick={this.handleToggleLocked}>
        {(() => { switch (this.props.val) {
          case 1:
            return <img src={red1} style={{height: "100px", width: "100px"}}/>
            break;
          case 2:
            return <img src={red2} style={{height: "100px", width: "100px"}}/>
            break;
          case 3:
              return <img src={red3} style={{height: "100px", width: "100px"}}/>
            break;
          case 4:
              return <img src={red4} style={{height: "100px", width: "100px"}}/>
            break;
          case 5:
              return <img src={red5} style={{height: "100px", width: "100px"}}/>
            break;
          case 6:
              return <img src={red6} style={{height: "100px", width: "100px"}}/>
            break;
            }
          })()}
      </button>
    );
    }
}

export default Die;
