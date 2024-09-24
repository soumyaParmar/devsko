export const stopWatch = (setTime: React.Dispatch<React.SetStateAction<{ hour: string; min: string; sec: string }>>) => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
  
    const formatTime = (time: number) => (time < 10 ? `0${time}` : `${time}`);
  
    const intervalId = setInterval(() => {
      seconds++;
  
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
  
      if (minutes === 60) {
        hours++;
        minutes = 0;
      }
  
      setTime({
        hour: formatTime(hours),
        min: formatTime(minutes),
        sec: formatTime(seconds),
      });
    }, 1000);
  
    return intervalId;
  };
  