import { useState, useRef, useEffect } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";

export default function Stopwatch() {
  const [counter, setCounter] = useState(0);   // số giây
  const timerIdRef = useRef(null);              // lưu id của setInterval
  const [isRunning, setIsRunning] = useState(false); // đồng hồ có đang chạy không


  // Bấm Start
  const startHandler = () => {
    if (timerIdRef.current !== null) return;    // đang chạy rồi thì không tạo thêm timer
    timerIdRef.current = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    setIsRunning(true);
  };

  // Bấm Stop
  const stopHandler = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
    setIsRunning(false);
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
    <Paper
      variant="outlined"
      sx={{ border: 4, borderRadius: "50px", px: 3, py: 4, width: 440, maxWidth: "calc(100vw - 32px)", textAlign: "center" }}
    >
      <Typography
      variant="h2"
      sx={{
        fontFamily: "monospace",
        fontWeight: "bold",
        color: "text.secondary",
        mb: 3,
        fontSize: "clamp(2.5rem, 10vw, 3.5rem)",
        whiteSpace: "nowrap",
      }}
    >

        {hours}:{minutes}:{seconds}
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button fullWidth variant="contained" color="success" onClick={startHandler} disabled={isRunning}>Start</Button>
        <Button fullWidth variant="contained" color="error" onClick={stopHandler} disabled={!isRunning}>Stop</Button>
        <Button fullWidth variant="contained" color="info" onClick={resetHandler} disabled={counter === 0}>Reset</Button>
      </Stack>
    </Paper>
  );
}
