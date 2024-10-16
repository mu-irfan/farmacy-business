import { baseUrlForAuth } from "@/lib/utils";
import axios from "axios";

// create query
export const createQuery = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrlForAuth}/query/ticket`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all queries
export const getAllQueries = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrlForAuth}/query/ticket`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get queries chats
export const getQueriesChats = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrlForAuth}/query/ticket-chat?uuid=${uuid}`,
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

// delete query
export const deleteQuery = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrlForAuth}/query/ticket?uuid=${uuid}`,
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
