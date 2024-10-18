import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

// get subsribed stats
export const getSubsribedsStats = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrlForAuth}/franchise/subscribe/stats?franchise_fk=${uuid}`,
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

// get subscribe products
export const getSubscribedProduct = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrlForAuth}/franchise/subscribe/product?franchise_fk=${uuid}`,
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

// get subscribe seeds
export const getSubscribedSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrlForAuth}/franchise/subscribe/seed?franchise_fk=${uuid}`,
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
