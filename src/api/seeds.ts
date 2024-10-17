import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

// get products stats
export const getSeedsStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/seed/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all seeds
export const getAllSeeds = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/seed/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get seed
export const getSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/seed/?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete seed
export const deleteSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrlForAuth}/seed?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
