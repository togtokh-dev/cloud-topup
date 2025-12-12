// src/public/group.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr } from "."; // <-- хэрвээ танай structure өөр бол "." болгож солиорой
import type { GroupT } from "./types"; // <-- type-уудаа types.ts дээрээ нэмнэ

/* ----------------------------- GET /group ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/group' --header 'x-api-key: ...'
export const GROUP_LIST = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false
): Promise<{ success: boolean; message: string; data?: GroupT[] }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/group`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "GROUP LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "GROUP LIST")
      }
    );

    if (res?.success && Array.isArray(res.data)) {
      return { success: true, message: res.message, data: res.data };
    }

    return { success: false, message: res?.message || "failed", data: [] };
  } catch (error) {
    return { success: false, message: parseErr(error), data: [] };
  }
};

/* ----------------------------- GET /group/:id ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/group/ROBLOX_CODE' --header 'x-api-key: ...'
export const GROUP_INFO = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  group_id: string
): Promise<{ success: boolean; message: string; data?: GroupT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/group/${group_id}`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "GROUP INFO",
        timeout: 20000,
        logger: logAxios(LOGGER, "GROUP INFO")
      }
    );

    if (res?.success) {
      return { success: true, message: res.message, data: res.data };
    }

    return { success: false, message: res?.message || "failed" };
  } catch (error) {
    return { success: false, message: parseErr(error) };
  }
};

export default {
  GROUP_LIST,
  GROUP_INFO
};
