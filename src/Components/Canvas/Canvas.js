import React, { Component } from "react";

import styles from "./Canvas.module.css";

class Canvas extends Component {
  state = {
    numberOfInfected: 0,
    numberOfDeath: 0,
  };
  componentDidMount() {
    const canva = this.refs.canvas;
    let ctx = canva.getContext("2d");
    const radians = Math.PI / 180;
    let particles = [];
    let length = 14;
    function randomVelocity() {
      var velocity = Math.random() + 2;
      var direction = Math.random() > 0.5 ? 1 : -1;
      return direction * velocity;
    }
    var Particle = function () {
      this.x = 0;
      this.y = 0;
      this.vx = randomVelocity();
      this.vy = randomVelocity();
      this.color = "green";
    };
    Particle.prototype.Draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 5, 0, radians * 360);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    };

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      let same = particles.reduce((total, Element) => {
        let tot = Element.filter(
          (Element) =>
            Math.abs(Element.x - this.x) < 2 &&
            Math.abs(Element.y - this.y) < 2 &&
            Element.color === "green"
        );
        return total + tot.length;
      }, 0);
      if (same > 1) {
        this.color = "red";
      }
      if (this.x < 0 || this.x > canva.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > canva.height) {
        this.vy = -this.vy;
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, canva.width, canva.height);
      for (let i = 0; i < length / 2; i++) {
        for (let j = 0; j < length / 2; j++) {
          particles[i][j].update();
          particles[i][j].Draw(ctx);
        }
      }
      requestAnimationFrame(loop);
    };
    for (let i = 0; i < length / 2; i++) {
      let arr = [];
      for (let j = 0; j < length / 2; j++) {
        arr[j] = new Particle();
        arr[j].x = i * 60 + 40;
        arr[j].y = j * 60 + 40;
        arr[j].Draw();
      }
      particles.push(arr);
    }
    particles[0][0].color = "red";
    let inter = setInterval(() => {
      let count = 0;
      let deathCount = 0;
      for (let i = 0; i < length / 2; i++) {
        for (let j = 0; j < length / 2; j++) {
          if (particles[i][j].color === "red") count++;
          if (particles[i][j].color === "grey") deathCount++;
        }
      }
      this.setState({ numberOfInfected: count, numberOfDeath: deathCount });
      if (count === 49) {
        clearInterval(inter);
      }
    }, 1000);
    setTimeout(
      setInterval(() => {
        for (let i = 0; i < length / 2; i++) {
          for (let j = 0; j < length / 2; j++) {
            if (particles[i][j].color === "red") {
              if (Math.random() < 0.1) particles[i][j].color = "grey";
            }
          }
        }
      }, 1500),
      4000
    );
    loop();
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
        <h1>number of infected : {this.state.numberOfInfected}</h1>
        <h1>number of deaths : {this.state.numberOfDeath}</h1>
      </div>
    );
  }
}

export default Canvas;
