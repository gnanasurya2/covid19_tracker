import React, { Component } from "react";

import styles from "./Canvas.module.css";

class Canvas extends Component {
  componentDidMount() {
    const canva = this.refs.canvas;
    let ctx = canva.getContext("2d");
    const radians = Math.PI / 180;
    //to fill the colour
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(20, 20, 50, 50);

    ctx.fillStyle = "rgb(0,0,200,0.5)";
    ctx.fillRect(45, 45, 50, 50);
    //add only the border of the rectangle
    ctx.strokeRect(45, 45, 50, 50);
    //clears  the space mentioned in the rectangle
    ctx.clearRect(60, 60, 20, 20);

    //to create a new path
    ctx.beginPath();
    //this is to map the points
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 200);
    ctx.lineTo(200, 250);
    ctx.lineTo(200, 100);
    // to fill the colors
    ctx.fillStyle = "blue";
    ctx.fill();
    //to close the existing path
    ctx.closePath();
    ctx.beginPath();
    //to draw a arc (starting x,starting y,starting angle,final angle,anticlockwise) *angles are measured in radians.
    ctx.arc(300, 300, 15, 0, radians * 90, true);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "black";
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        ctx.beginPath();
        ctx.arc(i * 50 + 30, j * 50 + 30, 7, 0, radians * 360);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <canvas
          ref="canvas"
          width="450"
          height="450"
          className={styles.canva}
        ></canvas>
      </div>
    );
  }
}

export default Canvas;
