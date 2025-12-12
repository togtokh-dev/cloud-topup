// src/public/account.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr } from "."; // structure-даа тааруулж "." болгож болно
import type { AccountT } from "./types";

/* ----------------------------- GET /account ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/account' --header 'x-api-key: ...'
export const ACCOUNT_INFO = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false
): Promise<{ success: boolean; message: string; data?: AccountT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/account`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ACCOUNT LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "ACCOUNT LIST")
      }
    );

    if (res?.success && Array.isArray(res.data)) {
      return { success: true, message: res.message, data: res.data };
    }

    return { success: false, message: res?.message || "failed", data: null };
  } catch (error) {
    return { success: false, message: parseErr(error), data: null };
  }
};

export default {
  ACCOUNT_INFO
};
