import axios from "axios";

 export const handleTimeApi = async () => {
    let utc_time = new Date();
    const res = await axios.get(
      "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
    );
    if (res) {
      const data = await res.data;
      utc_time = data.utc_datetime;
    }

    return utc_time;
  }; 