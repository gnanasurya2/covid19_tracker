import React, { Component, ReactSVG } from "react";
import styles from "./worldMap.module.css";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import WorldSvg from "../svg/worldSvg";
import Spinner from "../spinner/spinner";

class worldMap extends Component {
  constructor(props) {
    super(props);
    this.text = React.createRef();
    this.svg = React.createRef();
    this.tooltip = React.createRef();
  }
  state = {
    updating: false,
  };
  componentWillMount() {
    this.props.onFetchData();
  }

  clickHandler = (event) => {
    console.log(event.target.attributes[1].nodeValue);
    if (event.target.attributes[1].nodeValue.length === 2) {
      let countryData = this.props.data.locations.filter((country, index) => {
        if (country.country_code === event.target.attributes[1].nodeValue) {
          this.props.onUpdateData(index);
          return true;
        }
        return false;
      })[0];
      if (countryData) {
        let CTM = this.svg.current.getScreenCTM();
        let mouseX = (event.clientX - CTM.e) / CTM.a;
        let mouseY = (event.clientY - CTM.f) / CTM.d;
        this.tooltip.current.setAttributeNS(null, "visibility", "visible");
        this.tooltip.current.setAttributeNS(
          null,
          "transform",
          "translate(" + mouseX + "," + (mouseY - 100) + ")"
        );
        this.text.current.children[0].innerHTML = countryData.country;
        this.text.current.children[1].innerHTML = countryData.latest;
      } else {
        this.tooltip.current.setAttributeNS(null, "visibility", "hidden");
      }
    } else {
      this.tooltip.current.setAttributeNS(null, "visibility", "hidden");
    }
  };
  assignColorHandler = () => {
    let timeElasped = new Date().getMilliseconds();
    var countries = this.svg.current.children[0].children;
    this.props.data.locations.map((country) => {
      for (let c = 0; c < countries.length; c++) {
        if (countries[c].attributes[1].nodeValue === country.country_code) {
          if (country.latest < 100) {
            countries[c].attributes[0].nodeValue = "fill: #ff9191";
          } else if (country.latest >= 100 && country.latest < 1000) {
            countries[c].attributes[0].nodeValue = "fill: #ffa6a6";
          } else if (country.latest >= 1000 && country.latest < 2500) {
            countries[c].attributes[0].nodeValue = "fill: #ffb3b3";
          } else if (country.latest >= 2500 && country.latest < 5000) {
            countries[c].attributes[0].nodeValue = "fill: #ff6b6b";
          } else {
            countries[c].attributes[0].nodeValue = "fill: #ff1c1c";
          }
        }
      }
      // console.log(country.country_code, country.latest, ++count);
      return country;
    });
    // setTimeout(this.forceUpdate(), 1000);
    console.log(new Date().getMilliseconds() - timeElasped, "time");
    this.setState({ updating: true });
  };
  render() {
    let data = null;
    if (this.props.loading) {
      data = <Spinner />;
    }
    if (!this.props.loading && !this.state.updating) {
      this.assignColorHandler();
      this.svg.current.setAttributeNS(null, "visibility", "visible");
    }
    return (
      <div className={styles.map}>
        {data}
        <svg
          ref={this.svg}
          xmlnsvg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          enable_background="new 0 0 2000 1001"
          pretty_print="False"
          style={{
            strokeLinejoin: "round",
            stroke: "#000",
            cursor: "pointer",
            fill: "white",
            backgroundColor: "#368DC5",
          }}
          visibility="hidden"
          version="1.1"
          viewBox="0 0 2000 1001"
          width="100%"
          height="100%"
          id="svg2"
          transform="scale(1)"
          onClick={(event) => this.clickHandler(event)}
        >
          <WorldSvg />
          <g
            x="10"
            id="tool"
            ref={this.tooltip}
            visibility={"hidden"}
            style={{ position: "absolute" }}
          >
            <rect
              x="2"
              y="2"
              width="80"
              height="24"
              fill="black"
              opacity="0.4"
              rx="2"
              ry="2"
            />
            <rect width="250" height="100" fill="white" rx="2" ry="2" />
            <text
              ref={this.text}
              x="20"
              y="10"
              style={{
                fill: "blue",
                stroke: "blue",
                zIndex: 1005,
                position: "absolute",
                fontSize: "30px",
                padding: "5px",
                backgroundColor: "white",
              }}
            >
              <tspan x="50" y="30" dy=".6em">
                tool
              </tspan>
              <tspan x="50" dy="1.2em">
                tip
              </tspan>
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.dataerror,
    data: state.data.data,
    loading: state.data.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(actions.fetchData()),
    onUpdateData: (index) => dispatch(actions.updateData(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(worldMap);
