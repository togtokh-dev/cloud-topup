// src/public/item.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr } from "."; // structure-даа тааруулж "." болгож болно
import type { ItemT } from "./types";

/* ----------------------------- GET /item ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/item' --header 'x-api-key: ...'
export const ITEM_LIST = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false
): Promise<{ success: boolean; message: string; data?: ItemT[] }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/item`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ITEM LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "ITEM LIST")
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

/* ----------------------------- GET /item/:id ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/item/78979877'
export const ITEM_INFO = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  item_id: string
): Promise<{ success: boolean; message: string; data?: ItemT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/item/${item_id}`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ITEM INFO",
        timeout: 20000,
        logger: logAxios(LOGGER, "ITEM INFO")
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

/* ----------------------------- GET /item/:id/product ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/item/2/product'
export const ITEM_PRODUCTS = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  item_id: string
): Promise<{ success: boolean; message: string; data?: ItemT[] }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/item/${item_id}/product`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ITEM PRODUCTS",
        timeout: 20000,
        logger: logAxios(LOGGER, "ITEM PRODUCTS")
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

export default {
  ITEM_LIST,
  ITEM_INFO,
  ITEM_PRODUCTS
};
