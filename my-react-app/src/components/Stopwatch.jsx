import { useState, useRef, useEffect } from "react";
import "../styles/Stopwatch.css";

export default function Stopwatch() {
  const [counter, setCounter] = useState(0);   // số giây
  const timerIdRef = useRef(null);              // lưu id của setInterval

  // Bấm Start
  const startHandler = () => {
    if (timerIdRef.current !== null) return;    // đang chạy rồi thì không tạo thêm timer
    timerIdRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
  };

  // Bấm Stop
  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  // Bấm Reset (thử thách phụ)
  const resetHandler = () => {
    stopHandler();
    setCounter(0);
  };

  // Cleanup khi component bị gỡ (unmount)
  useEffect(() => {
    return () => {
      clearInterval(timerIdRef.current);
    };
  }, []);

  const hours = String(Math.floor(counter / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((counter % 3600) / 60)).padStart(2, "0");
  const seconds = String(counter % 60).padStart(2, "0");

  return (
    <div className="stopwatch">
      <h1 className="display">{hours}:{minutes}:{seconds}</h1>
      <div className="controls">
        <button onClick={startHandler} className="start-button">Start</button>
        <button onClick={stopHandler} className="stop-button">Stop</button>
        <button onClick={resetHandler} className="reset-button">Reset</button>
      </div>
    </div>
  );
}