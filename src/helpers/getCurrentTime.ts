import { handleTimeApi } from "./timeApi";

let currentTime: { hour: string; minutes: string; suffix: string } = {
  hour: "",
  minutes: "",
  suffix: "",
};

const handleGetCurrentTime = async () => {
  const utc_time = await handleTimeApi();
  const time = new Date(utc_time).toLocaleTimeString().split(":");
  const hour = time[0];
  const minutes = time[1];
  const suffix = time[2].split(" ")[1];

  return { hour, minutes, suffix };
};

export const getCurrentTime = async () => {
  currentTime = await handleGetCurrentTime();
  return currentTime;
};
