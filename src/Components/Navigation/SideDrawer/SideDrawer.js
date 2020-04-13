import React, { Component } from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";

class sideDrawer extends Component {
  state = {
    drawerStyles: { display: "none" },
  };
  componentWillUpdate() {
    if (!this.props.drawerState) {
      this.setState({ drawerStyles: { display: "flex" } });
    }
  }
  closeDrawerHandler = () => {
    this.setState({ drawerStyles: { display: "none" } });
    this.props.changeState();
  };
  render() {
    const classes = ["fa", "fa-times", "fa-2x", styles.icon];
    return (
      <div className={styles.sideDrawer} style={this.state.drawerStyles}>
        <i
          className={classes.join(" ")}
          aria-hidden="true"
          onClick={this.closeDrawerHandler}
        ></i>
        <NavigationItems />
      </div>
    );
  }
}

export default sideDrawer;
