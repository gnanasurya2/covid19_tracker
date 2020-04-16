import React, { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../Components/Navigation/Toolbar/toolbar";
import SideDrawer from "../Components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    sideDrawerState: false,
  };
  sideDrawerHandler = () => {
    this.setState({ sideDrawerState: !this.state.sideDrawerState });
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <Toolbar clicked={this.sideDrawerHandler} />
        <SideDrawer
          drawerState={this.state.sideDrawerState}
          changeState={this.sideDrawerHandler}
        />
        <main style={{ marginTop: "90px" }}>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
