import { Component } from "react";
export default class Crowdsaleno1 extends Component {
  render() {
    return (
      <div className="p-3">
        {/* <Countdown></Countdown> */}
        <div className="flex justify-center p=2">
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              days11
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    );
  }
}
