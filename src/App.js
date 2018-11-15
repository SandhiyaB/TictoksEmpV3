import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  format,
  display,
  transms,
  transstr,
  reduce,
} from './utils';
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      re: '00:00:00',
      le: [],
      isRun: false,
      isPause: false,
    };
    this.timeId = '';
    this.br = '00:00:00';
    this.delay = 0;
    this.st = null;
    this.progress = undefined;
    this.sss = undefined;
    this.ss = undefined;
    this.mm = 0;
    this.hh = 0;
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
    this.count = this.count.bind(this);
    this.pause = this.pause.bind(this);
    this.step = this.step.bind(this);
  }
  renderRecord() {
    const data = this.state.le;
    return data.map((record, index) => 
    (<div className="record" key={`key${index}`}>{record}</div>));
  }
  start() {
    this.timeId = window.requestAnimationFrame(this.step);
    this.setState({
      isRun: true,
      isPause: false,
    });
  }
  pause() {
    this.setState({
      isRun: true, // still run in requestAnimationFrame
      isPause: true,
    });
  }
  reset() {
    let r;
    window.cancelAnimationFrame(this.timeId);
    this.mm = 0;
    this.ss = 0;
    this.hh = 0;
    this.sss = 0;
    this.delay = 0;
    r = format(this.hh, 2) + ':' + format(this.mm, 2) + ':' + format(this.ss, 2) ;
    this.setState({
      re: r,
      le: [],
      isRun: false,
      isPause: false,
    });
  }
  count() {
    let ru;
    let newlist = this.state.le.slice();
    const { re, isRun, isPause } = this.state;
    if (this.br !== re && isRun && !isPause) {
      ru = reduce(this.state.re, this.br);
      newlist.unshift(ru);
      this.br = re;
      this.setState({ le: newlist });
    }
  }
  step(timestamp) {
    let temp1, temp2, t, r;
    const { isRun, isPause } = this.state;
    if (this.st === null) { this.st = timestamp; }
    if (isRun && !isPause) {
      this.progress = timestamp - this.st - this.delay;
      t = ((this.progress/1000).toFixed(3));
      this.ss = +(t.split('.')[0]);
      this.sss = +(t.split('.')[1]);
      temp1 = display(this.ss, 3600);
      this.hh = temp1.tbig;
      this.ss = temp1.tsmall;
      temp2 = display(this.ss, 60);
      this.mm = temp2.tbig;
      this.ss = temp2.tsmall;
      r = format(this.hh, 2) + ':' + format(this.mm, 2) + ':' + format(this.ss, 2)  ;
      this.setState({ re: r });
      window.requestAnimationFrame(this.step);
    } else if (isRun && isPause) { // press stop
      this.delay = timestamp - this.st - this.progress;
      window.requestAnimationFrame(this.step);
    } else if (!isRun && !isPause) { // press reset
      this.st = null;
      this.br = '00:00:00';
    }
  }
  render() {
    const { isRightHover, isLeftHover, isRun, isPause } = this.state;
    return(
      <div className="layout">
        <div className="header">Timer</div>
        <div className="panel">
          {this.state.re}
        </div>
          {!isPause && <span>
            <button 
              className="button"
              onClick={this.count}
            >Count
            </button>
          </span>}
          {isPause && <span>
            <button
              className="button"
              onClick={this.reset}
            >Reset
            </button>
          </span>}
          { (!isRun === !isPause) && <span>
            <button 
              className="button"
              onClick={this.start}
            >Start
            </button>
          </span>}
          {(isRun !== isPause) &&<span>
            <button
              className="button"
              onClick={this.pause}
            >Pause
            </button>
          </span>}
          <div className="list">
            {this.renderRecord()}
          </div>
      </div>  
    );
  }
}
export default Timer;
