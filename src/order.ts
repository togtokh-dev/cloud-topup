// src/public/order.ts
import { axiosMasterLogger } from "axios-master";
import { logAxios, parseErr, queryparam } from "."; // structure-даа тааруулж "." болгож болно
import type {
  OrderListFilterT,
  OrderT,
  OrderVerifyResT,
  OrderVerifyT
} from "./types";

/* ----------------------------- POST /order/verify/:id ----------------------------- */
// curl --location '.../topup/v1/public/order/verify/:order_id' --data '{ "charge_account":"5737" }'
export const ORDER_VERIFY = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  order_id: string,
  params: OrderVerifyT
): Promise<{ success: boolean; message: string; data?: OrderVerifyResT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "POST",
        url: `${HOST}/topup/v1/public/order/verify/${order_id}`,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        data: params
      },
      {
        name: "ORDER VERIFY",
        timeout: 20000,
        logger: logAxios(LOGGER, "ORDER VERIFY")
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

/* ----------------------------- GET /order ----------------------------- */
// curl --location '.../topup/v1/public/order'
export const ORDER_LIST = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  params?: OrderListFilterT
): Promise<{
  success: boolean;
  message: string;
  data?: {
    orders: OrderT[];
    total: number;
    page: number;
    limit: number;
  };
}> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/order/?${
          params ? queryparam(params) : ""
        }`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ORDER LIST",
        timeout: 20000,
        logger: logAxios(LOGGER, "ORDER LIST")
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

/* ----------------------------- GET /order/details/:id ----------------------------- */
// curl --location '.../topup/v1/public/order/details/:order_uuid'
export const ORDER_DETAILS = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  order_uuid: string
): Promise<{ success: boolean; message: string; data?: OrderT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "GET",
        url: `${HOST}/topup/v1/public/order/details/${order_uuid}`,
        headers: {
          "x-api-key": API_KEY
        }
      },
      {
        name: "ORDER DETAILS",
        timeout: 20000,
        logger: logAxios(LOGGER, "ORDER DETAILS")
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

/* ----------------------------- POST /order/create ----------------------------- */
// curl --location '.../topup/v1/public/order/create' --data '{ item_id, buy_num, callback, order_id, info }'
export const ORDER_CREATE = async (
  HOST: string,
  API_KEY: string,
  LOGGER = false,
  body: {
    item_id: string;
    buy_num: number;
    callback: string;
    order_id: string;
    info?: Record<string, any>;
  }
): Promise<{ success: boolean; message: string; data?: OrderT }> => {
  try {
    const res = await axiosMasterLogger(
      {
        method: "POST",
        url: `${HOST}/topup/v1/public/order/create`,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        data: body
      },
      {
        name: "ORDER CREATE",
        timeout: 20000,
        logger: logAxios(LOGGER, "ORDER CREATE")
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
  ORDER_VERIFY,
  ORDER_LIST,
  ORDER_DETAILS,
  ORDER_CREATE
};
