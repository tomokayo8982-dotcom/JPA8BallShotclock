import { useState, useEffect } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // 通知音
  const beepWeak = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  );
  const beepMid = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  );
  const beepStrong = new Audio(
    "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  );

  // タイマー処理
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  // 30/40/45秒通知
  useEffect(() => {
    if (time === 30) {
      beepWeak.play();
      navigator.vibrate?.(100);
    }
    if (time === 40) {
      beepMid.play();
      navigator.vibrate?.([200, 100, 200]);
    }
    if (time === 45) {
      beepStrong.play();
      navigator.vibrate?.([300, 150, 300]);
      setIsRunning(false);
    }
  }, [time]);

  // 色変化
  const getColor = () => {
    if (time >= 45) return "red";
    if (time >= 40) return "orange";
    if (time >= 30) return "yellow";
    return "white";
  };

  // メインボタン表示
  const getMainButtonLabel = () => {
    if (time === 0 && !isRunning) return "開始";
    if (isRunning) return "停止";
    if (!isRunning && time > 0 && time < 45) return "クリア";
    if (time >= 45) return "クリア";
    return "開始";
  };

  // メインボタン動作
  const handleMainButton = () => {
    const label = getMainButtonLabel();

    if (label === "開始") {
      setTime(0);
      setIsRunning(true);
      setHasStarted(true);
    } else if (label === "停止") {
      setIsRunning(false);
    } else if (label === "クリア") {
      setTime(0);
      setIsRunning(false);
      setHasStarted(false);
    }
  };

  // 一時停止/再開ボタン表示
  const getPauseResumeLabel = () => {
    if (!hasStarted || time >= 45) return "一時停止";
    return isRunning ? "一時停止" : "再開";
  };

  // ボタンスタイル（画面幅50%）
  const buttonStyle = {
    width: "50vw",
    height: "80px",
    fontSize: "28px",
    borderRadius: "0",
    border: "1px solid #333",
  };

  return (
    <div
      style={{
        background: "black",
        height: "100vh",
        color: getColor(),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ marginTop: "20px" }}>JPA 8ボール ショットクロック</h1>
        <h2 style={{ fontSize: "100px", margin: "40px 0" }}>{time} 秒</h2>
        {time >= 45 && <h3 style={{ color: "red" }}>ファウル！</h3>}
      </div>

      {/* 画面下に固定 */}
      <div style={{ display: "flex" }}>
        <button style={buttonStyle} onClick={handleMainButton}>
          {getMainButtonLabel()}
        </button>

        <button
          style={buttonStyle}
          onClick={() => setIsRunning(!isRunning)}
          disabled={!hasStarted || time >= 45}
        >
          {getPauseResumeLabel()}
        </button>
      </div>
    </div>
  );
}
