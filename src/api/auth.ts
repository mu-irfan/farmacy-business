import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

export const registerCompany = async (data: RegisterCompanyPayload) => {
  try {
    const res = await axios.post(`${baseUrlForAuth}/auth/signup`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const loginCompany = async (data: any) => {
  try {
    const res = await axios.post(`${baseUrlForAuth}/auth/login`, data);
    return res.data;
  } catch (error) {
    return error;
  }
};
