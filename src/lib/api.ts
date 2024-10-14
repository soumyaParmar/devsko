/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import instance from "../../axiosConfig";
import { getConfigHeader } from "@/helpers/getConfigHeader";
import { baseUrl } from "./constString";
import { validateToken } from "./tokenHandler";

const baseApiUrl = `${baseUrl}/api/v1/`

export const getData = async (url: string) => {
  await validateToken();
  const config = getConfigHeader();
  try {
    const response = await axios.get(`${baseApiUrl}${url}`, { headers: config });
    return response;
  } catch (error) {
    console.error("Some error occured in fetcching data:", error);
    return null;
  }
};

export const postData = async (url: string, data: any) => {
  await validateToken();
  const config = getConfigHeader();
  try {
    const response = await axios.post(`${baseApiUrl}${url}`, data, { headers: config });
    return response;
  } catch (error) {
    console.error("some error occured", error);
    return null;
  }
};
