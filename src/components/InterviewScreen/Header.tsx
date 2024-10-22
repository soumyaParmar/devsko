import { getCurrentDate } from "@/helpers/getCurrentDate";
import { getCurrentTime } from "@/helpers/getCurrentTime";
import { stopWatch } from "@/helpers/stopWatch";
// import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import style from "@/styles/header.module.css";
import { StateSetter } from "@/utils/types/statesetter";

interface headerType {
  testStarted: string;
  setTestStarted: StateSetter<string>;
  setText?:StateSetter<boolean>;
}

const Header: React.FC<headerType> = ({ setTestStarted, testStarted,setText }) => {
  // const router = useRouter();
  const { day, month, year } = getCurrentDate();
  const [currentTime, setCurrentTime] = useState({
    hour: "",
    minutes: "",
    suffix: "",
  });
  const [time, setTime] = useState({ hour: "00", min: "00", sec: "00" });
  const [stopwatchId, setStopWatchId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setStopWatchId(stopWatch(setTime));
  };

  const handleTestStart = () => {
    setTestStarted("yes");
    startTimer();
  };

  const handleTestEnd = () => {
    setTestStarted("end");
    if (stopwatchId) clearInterval(stopwatchId);
    if (window && "speechSynthesis" in window) {
      setText(true);
      const utterance = new SpeechSynthesisUtterance(
        "Thank you for participating in the test. Your results will be displayed shortly."
      );
      speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setText(false);
      };
    }
    setTimeout(() => {
      window.location.href = "/dashboard/1";
    }, 5000);
  };

  useEffect(() => {
    const fetchTime = async () => {
      const time = await getCurrentTime();
      setCurrentTime(time);
    };
    fetchTime();

    const timeInterval = setInterval(fetchTime, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className={style.top}>
      <div className={style.logo}>DevSko</div>
      <div className={style.top_middle}>
        <span className={style.interview}>
          Interview for {"Software Developer"}
        </span>
        <div className="flex gap-3 justify-center">
          <span className={style.day}>{`${day} ${month} ${year}`}</span>
          <span
            className={style.day}
          >{`${currentTime.hour}:${currentTime.minutes} ${currentTime.suffix}`}</span>
        </div>
      </div>
      <div className={style.right_btns}>
        <span>{`${time.hour}:${time.min}:${time.sec}`}</span>
        <button
          className={testStarted == "yes" ? style.end_btn : style.start_btn}
          onClick={testStarted == "yes" ? handleTestEnd : handleTestStart}
        >
          {testStarted == "yes" ? "Terminate" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Header;
