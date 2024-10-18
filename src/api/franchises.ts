import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

// get products stats
export const getFranchisesStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/franchise/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create franchise
export const createFranchise = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrlForAuth}/franchise`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get franchises
export const getAllFranchises = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/franchise/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get inactive franchises
export const getAllInActiveFranchise = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/franchise/inactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update franchises
export const updateFranchise = async (data: any, token: string) => {
  try {
    const res = await axios.patch(
      `${baseUrlForAuth}/franchise?uuid=${data.uuid}`,
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

// delete franchise
export const deleteFranchise = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrlForAuth}/franchise?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
