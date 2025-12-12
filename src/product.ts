// src/public/product.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr } from "."; // structure-даа тааруулж "." болгож болно
import type { ProductT, ProductAddItemT } from "./types";

/* ----------------------------- GET /product ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/product'
export const PRODUCT_LIST = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false
): Promise<{ success: boolean; message: string; data?: ProductT[] }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/product`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "PRODUCT LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "PRODUCT LIST")
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

/* ----------------------------- GET /product/:id ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/product/2'
export const PRODUCT_INFO = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  product_id: string | number
): Promise<{ success: boolean; message: string; data?: ProductT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/product/${product_id}`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "PRODUCT INFO",
        timeout: 20000,
        logger: logAxios(LOGGER, "PRODUCT INFO")
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

/* ----------------------------- GET /product/:id/item ----------------------------- */
// curl --location 'https://api-staging.cloudhub.mn/topup/v1/public/product/2/item'
export const PRODUCT_ITEMS = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  product_id: string | number
): Promise<{ success: boolean; message: string; data?: ProductAddItemT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/product/${product_id}/item`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "PRODUCT ITEMS",
        timeout: 20000,
        logger: logAxios(LOGGER, "PRODUCT ITEMS")
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
  PRODUCT_LIST,
  PRODUCT_INFO,
  PRODUCT_ITEMS
};
