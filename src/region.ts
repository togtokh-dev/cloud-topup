// src/public/region.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr } from "."; // structure-даа тааруулж "." болгож болно
import type { RegionT } from "./types";

/* ----------------------------- GET /region ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/region'
export const REGION_LIST = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false
): Promise<{ success: boolean; message: string; data?: RegionT[] }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/region`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "REGION LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "REGION LIST")
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

/* ----------------------------- GET /region/:id ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/region/ROBLOX_CODE'
export const REGION_INFO = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  region_id: string
): Promise<{ success: boolean; message: string; data?: RegionT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/region/${region_id}`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "REGION INFO",
        timeout: 20000,
        logger: logAxios(LOGGER, "REGION INFO")
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
  REGION_LIST,
  REGION_INFO
};
