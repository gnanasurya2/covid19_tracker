import React, { Component } from "react";
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
    isPointerDown: false,
    pointerOrigin: null,
  };
  componentWillMount() {
    this.props.onFetchData();
  }

  clickHandler = (event) => {
    let updatedIndex = null;
    if (event.target.attributes.id.nodeValue.length === 2) {
      let countryData = this.props.data.locations.filter((country, index) => {
        if (country.country_code === event.target.attributes.id.nodeValue) {
          if (!updatedIndex) {
            updatedIndex = index;
          }
          return true;
        }
        return false;
      });
      let DeathData = this.props.death.locations.filter((country, index) => {
        if (country.country_code === event.target.attributes.id.nodeValue) {
          if (!updatedIndex) {
            updatedIndex = index;
          }
          return true;
        }
        return false;
      });

      let RecoveredData = this.props.recovered.locations.filter(
        (country, index) => {
          if (country.country_code === event.target.attributes.id.nodeValue) {
            if (!updatedIndex) {
              updatedIndex = index;
            }
            return true;
          }
          return false;
        }
      );

      if (countryData.length > 0 && countryData[0].province !== "") {
        let totalCases = countryData.reduce(
          (total, element) => total + element.latest,
          0
        );

        let totalRecovered = RecoveredData.reduce(
          (total, element) => total + element.latest,
          0
        );
        let totalDeaths = DeathData.reduce(
          (total, element) => total + element.latest,
          0
        );
        countryData[0].latest = totalCases;
        RecoveredData[0].latest = totalRecovered;
        DeathData[0].latest = totalDeaths;
        countryData[0].province = "";
      }
      if (countryData.length > 0) {
        this.props.onUpdateData(countryData[0].country_code);
        let CTM = this.svg.current.getScreenCTM();
        let mouseX = (event.clientX - CTM.e) / CTM.a;
        let mouseY = (event.clientY - CTM.f) / CTM.d;
        this.tooltip.current.setAttributeNS(null, "visibility", "visible");
        this.tooltip.current.setAttributeNS(
          null,
          "transform",
          "translate(" + mouseX + "," + (mouseY - 100) + ")"
        );
        this.text.current.children[0].innerHTML = countryData[0].country;
        this.text.current.children[1].innerHTML = countryData[0].latest
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      } else {
        this.tooltip.current.setAttributeNS(null, "visibility", "hidden");
        this.props.onUpdateData(null);
      }
    } else {
      this.tooltip.current.setAttributeNS(null, "visibility", "hidden");
      this.props.onUpdateData(null);
    }
  };
  assignColorHandler = () => {
    console.log("chrome is hell");
    let countries = this.svg.current.children[0].children;
    console.log(countries[0].attributes.id);
    this.props.data.locations.map((country) => {
      for (let c = 0; c < countries.length; c++) {
        if (countries[c].attributes.id.nodeValue === country.country_code) {
          if (country.latest < 100) {
            countries[c].attributes.style.nodeValue = "fill: #ff9191";
          } else if (country.latest >= 100 && country.latest < 1000) {
            countries[c].attributes.style.nodeValue = "fill: #ffa6a6";
          } else if (country.latest >= 1000 && country.latest < 2500) {
            countries[c].attributes.style.nodeValue = "fill: #ffb3b3";
          } else if (country.latest >= 2500 && country.latest < 5000) {
            countries[c].attributes.style.nodeValue = "fill: #ff6b6b";
          } else {
            countries[c].attributes.style.nodeValue = "fill: #ff1c1c";
          }
        }
      }
      return country;
    });
    this.setState({ updating: true });
  };

  wheelMovement = (event) => {
    event.preventDefault();
    let svgPoint = this.svg.current.viewBox.baseVal;
    if (svgPoint.width <= 2001) {
      event.preventDefault();
      let normalized;
      let delta = event.wheelDelta;
      if (delta) {
        normalized = delta % 120 === 0 ? delta / 120 : delta / 12;
      } else {
        delta = event.deltaY || event.detail || 0;
        normalized = -(delta % 3 ? delta * 10 : delta / 3);
      }

      let scaleDelta = normalized > 0 ? 1 / 1.2 : 1.2;
      let point = this.svg.current.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      let startPoint = point.matrixTransform(
        this.svg.current.getScreenCTM().inverse()
      );
      svgPoint.width *= scaleDelta;
      svgPoint.height *= scaleDelta;
      if (svgPoint.width > 2000) {
        svgPoint.width = 2000;
        svgPoint.height = 1000;
        svgPoint.x = 0;
        svgPoint.y = 0;
        return;
      }
      svgPoint.x -= (startPoint.x - svgPoint.x) * (scaleDelta - 1);
      svgPoint.y -= (startPoint.y - svgPoint.y) * (scaleDelta - 1);
    }
  };
  getPointFromEvent = (event) => {
    let point = this.svg.current.createSVGPoint();

    if (event.targetTouches) {
      point.x = event.targetTouches[0].clientX;
      point.y = event.targetTouches[0].clientY;
    } else {
      point.x = event.clientX;
      point.y = event.clientY;
    }

    let invertedSVGMatrix = this.svg.current.getScreenCTM().inverse();
    return point.matrixTransform(invertedSVGMatrix);
  };
  onPointerDown = (event) => {
    this.setState({
      isPointerDown: true,
      pointerOrigin: this.getPointFromEvent(event),
    });
  };

  onPointerMove = (event) => {
    if (!this.state.isPointerDown) {
      return;
    }
    event.preventDefault();
    let viewBox = this.svg.current.viewBox.baseVal;
    let pointerPosition = this.getPointFromEvent(event);
    viewBox.x -= pointerPosition.x - this.state.pointerOrigin.x;
    viewBox.y -= pointerPosition.y - this.state.pointerOrigin.y;
  };

  onPointerUp = () => {
    this.setState({ isPointerDown: false });
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
          pretty_print="False"
          style={{
            strokeLinejoin: "round",
            stroke: "#000",
            cursor: "pointer",
            fill: "white",
            backgroundColor: "#368DC5",
            overflow: "scroll",
          }}
          visibility="hidden"
          version="1.1"
          viewBox="0 0 2000 1000"
          width="100%"
          height="100%"
          id="svg2"
          transform="scale(1)"
          onClick={this.clickHandler}
          onWheel={this.wheelMovement}
          onPointerDown={this.onPointerDown}
          onPointerUp={this.onPointerUp}
          onPointerLeave={this.onPointerUp}
          onPointerMove={this.onPointerMove}
          preserveAspectRatio="align"
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
    death: state.data.deathsData,
    recovered: state.data.recoveredData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchData: () => dispatch(actions.fetchData()),
    onUpdateData: (index) => dispatch(actions.updateData(index)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(worldMap);
