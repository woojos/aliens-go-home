import React, { Component } from 'react';
import Canvas from './components/Canvas';
import PropTypes from 'prop-types';
import {getCanvasPosition} from "./utils/formulas";

class App extends Component {

  componentDidMount() {
    const self = this;
    setInterval(() => {
      self.props.moveObjects(self.canvasMousePosition);
    }, 10);
  }

  trackMouse(event) {
    this.canvasMousePosition = getCanvasPosition(event);
  }

  render() {
    return (
      <Canvas
        angle={this.props.angle}
        trackMouse={event => (this.trackMouse(event))}
      />
    );
  }

}

App.propTypes = {
    angle: PropTypes.number.isRequired,
    moveObjects: PropTypes.func.isRequired
};

export default App;
