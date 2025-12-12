// src/index.ts
import { AxiosMasterLoggerType } from "axios-master";

/* public modules */
import { GROUP_LIST, GROUP_INFO } from "./group";
import { ITEM_LIST, ITEM_INFO, ITEM_PRODUCTS } from "./item";
import { PRODUCT_LIST, PRODUCT_INFO, PRODUCT_ITEMS } from "./product";
import { REGION_LIST, REGION_INFO } from "./region";
import { ACCOUNT_LIST } from "./account";
import { ORDER_VERIFY, ORDER_LIST, ORDER_DETAILS, ORDER_CREATE } from "./order";

/* types */
import type {
  GroupT,
  ItemT,
  ProductT,
  RegionT,
  AccountT,
  OrderT,
  ProductAddItemT
} from "./types";

export interface CloudTopupConfig {
  HOST: string;
  API_KEY: string;
  LOGGER?: boolean; // default false
}

/* ----------------------------- Helper error parser ----------------------------- */
export function parseErr(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as any).response === "object"
  ) {
    const err = error as any;
    return err.response?.data?.message || "error";
  }
  return "unexpected error";
}

/* ----------------------------- Logger helper ----------------------------- */
export const logAxios =
  (enabled: boolean, name: string) => (data: AxiosMasterLoggerType) => {
    if (!enabled) return;

    console.log(
      `[${name}]`,
      JSON.stringify(
        {
          time: data?.json?.time,
          request: data?.json?.request,
          response: `${data?.json?.response ?? ""}`,
          responseBody: data?.json?.responseBody,
          statusCode: data?.json?.statusCode
        },
        null,
        2
      )
    );
  };

/* ----------------------------- MAIN CLASS ----------------------------- */
export class CloudTopup {
  private HOST: string;
  private API_KEY: string;
  private LOGGER: boolean;

  constructor(config: CloudTopupConfig) {
    this.HOST = config.HOST;
    this.API_KEY = config.API_KEY;
    this.LOGGER = config.LOGGER ?? false; // ✅ default false
  }

  /* -------------------------------- PUBLIC APIs -------------------------------- */
  public = {
    group: {
      list: (): Promise<{
        success: boolean;
        message: string;
        data?: GroupT[];
      }> => GROUP_LIST(this.HOST, this.API_KEY, this.LOGGER),

      info: (
        group_id: string
      ): Promise<{ success: boolean; message: string; data?: GroupT }> =>
        GROUP_INFO(this.HOST, this.API_KEY, this.LOGGER, group_id)
    },

    item: {
      list: (): Promise<{
        success: boolean;
        message: string;
        data?: ItemT[];
      }> => ITEM_LIST(this.HOST, this.API_KEY, this.LOGGER),

      info: (
        item_id: string
      ): Promise<{ success: boolean; message: string; data?: ItemT }> =>
        ITEM_INFO(this.HOST, this.API_KEY, this.LOGGER, item_id),

      products: (
        item_id: string
      ): Promise<{ success: boolean; message: string; data?: ItemT[] }> =>
        ITEM_PRODUCTS(this.HOST, this.API_KEY, this.LOGGER, item_id)
    },

    product: {
      list: (): Promise<{
        success: boolean;
        message: string;
        data?: ProductT[];
      }> => PRODUCT_LIST(this.HOST, this.API_KEY, this.LOGGER),

      info: (
        product_id: string | number
      ): Promise<{
        success: boolean;
        message: string;
        data?: ProductT;
      }> => PRODUCT_INFO(this.HOST, this.API_KEY, this.LOGGER, product_id),

      info_add_items: (
        product_id: string | number
      ): Promise<{
        success: boolean;
        message: string;
        data?: ProductAddItemT;
      }> => PRODUCT_ITEMS(this.HOST, this.API_KEY, this.LOGGER, product_id)
    },

    region: {
      list: (): Promise<{
        success: boolean;
        message: string;
        data?: RegionT[];
      }> => REGION_LIST(this.HOST, this.API_KEY, this.LOGGER),

      info: (
        region_id: string
      ): Promise<{ success: boolean; message: string; data?: RegionT }> =>
        REGION_INFO(this.HOST, this.API_KEY, this.LOGGER, region_id)
    },

    account: {
      list: (): Promise<{
        success: boolean;
        message: string;
        data?: AccountT[];
      }> => ACCOUNT_LIST(this.HOST, this.API_KEY, this.LOGGER)
    },

    order: {
      verify: (
        order_id: string,
        params: { charge_account: string }
      ): Promise<{ success: boolean; message: string; data?: any }> =>
        ORDER_VERIFY(this.HOST, this.API_KEY, this.LOGGER, order_id, params),

      list: (): Promise<{
        success: boolean;
        message: string;
        data?: OrderT[];
      }> => ORDER_LIST(this.HOST, this.API_KEY, this.LOGGER),

      details: (
        order_uuid: string
      ): Promise<{
        success: boolean;
        message: string;
        data?: OrderT;
      }> => ORDER_DETAILS(this.HOST, this.API_KEY, this.LOGGER, order_uuid),

      create: (body: {
        item_id: string;
        buy_num: number;
        callback: string;
        order_id: string;
        info?: Record<string, any>;
      }): Promise<{ success: boolean; message: string; data?: any }> =>
        ORDER_CREATE(this.HOST, this.API_KEY, this.LOGGER, body)
    }
  };
}

export default CloudTopup;
