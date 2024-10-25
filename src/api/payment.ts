import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create bulk payment
export const createBulkPayment = async (data: any, token: string) => {
  console.log(data, "ssssss");

  try {
    const res = await axios.post(
      `${baseUrl}/payment/jazzcash/mwallet/bulk`,
      data,
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
