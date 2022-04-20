import { useState, useEffect } from "react";
const Countdown = (props: any) => {
  console.log(props);
  const { initialMinute = 0, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="p-2 ">
      {minutes === 0 && seconds === 0 ? null : (
        <div className="flex justify-center p=3">
          <div className=" grid grid-flow-col gap-5 text-center auto-cols-max ">
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1"></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span className="s1">{minutes}</span>
              </span>
              min
            </div>
            <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl countdown">
                <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
              </span>
              sec
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
