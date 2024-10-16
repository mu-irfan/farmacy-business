import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

// create manager
export const createManager = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrlForAuth}/franchise/manager`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get managers
export const getAllManagers = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/franchise/manager/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update manager
export const updateManager = async (data: any, token: string) => {
  try {
    const res = await axios.patch(
      `${baseUrlForAuth}/franchise/manager?uuid=${data.uuid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete manager
export const deleteManager = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrlForAuth}/franchise/manager?uuid=${uuid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
