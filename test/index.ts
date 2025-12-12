// test/index.ts
import { CloudTopup } from "../src/index";

async function StartTest() {
  const cloud = new CloudTopup({
    HOST: "https://api-staging.cloudhub.mn",
    API_KEY: "YOUR_API_KEY",
    LOGGER: true // 👈 log хармаар бол true
  });

  /* ----------------------------- GROUP ----------------------------- */
  console.log("====== 📦 GROUP LIST ======");
  const groups = await cloud.group.list();
  console.log(groups);

  const groupId = groups.data?.[0]?.id || "ROBLOX_CODE";

  console.log("====== 📦 GROUP INFO ======");
  const groupInfo = await cloud.group.info(groupId);
  console.log(groupInfo);

  /* ----------------------------- ITEM ----------------------------- */
  console.log("====== 🧩 ITEM LIST ======");
  const items = await cloud.item.list();
  console.log(items);

  const itemId = items.data?.[0]?.id?.toString() || "78979877";

  console.log("====== 🧩 ITEM INFO ======");
  const itemInfo = await cloud.item.info(itemId);
  console.log(itemInfo);

  console.log("====== 🧩 ITEM PRODUCTS ======");
  const itemProducts = await cloud.item.products(itemId);
  console.log(itemProducts);

  /* ----------------------------- PRODUCT ----------------------------- */
  console.log("====== 🛒 PRODUCT LIST ======");
  const products = await cloud.product.list();
  console.log(products);

  const productId = products.data?.[0]?.id || 2;

  console.log("====== 🛒 PRODUCT INFO ======");
  const productInfo = await cloud.product.info(productId);
  console.log(productInfo);

  console.log("====== 🛒 PRODUCT ADD ITEMS ======");
  const productItems = await cloud.product.info_add_items(productId);
  console.log(productItems);

  /* ----------------------------- REGION ----------------------------- */
  console.log("====== 🌍 REGION LIST ======");
  const regions = await cloud.region.list();
  console.log(regions);

  const regionId = regions.data?.[0]?.id || "ROBLOX_CODE";

  console.log("====== 🌍 REGION INFO ======");
  const regionInfo = await cloud.region.info(regionId);
  console.log(regionInfo);

  /* ----------------------------- ACCOUNT ----------------------------- */
  console.log("====== 🏦 ACCOUNT LIST ======");
  const accounts = await cloud.account.list();
  console.log(accounts);

  /* ----------------------------- ORDER ----------------------------- */
  console.log("====== 🧾 ORDER LIST ======");
  const orders = await cloud.order.list();
  console.log(orders);

  const orderUUID =
    orders.data?.orders[0].id || "a8c0ec4d-e1e1-41fc-a6c9-cdc8f939b8e7";

  console.log("====== 🧾 ORDER DETAILS ======");
  const orderDetails = await cloud.order.details(orderUUID);
  console.log(orderDetails);

  console.log("====== 🧾 ORDER VERIFY ======");
  const verify = await cloud.order.verify(orderUUID, {
    charge_account: "5737"
  });
  console.log(verify);

  console.log("====== 🧾 ORDER CREATE ======");
  const create = await cloud.order.create({
    item_id: itemId,
    buy_num: 1,
    callback: "https://api-staging.cloudhub.mn/topup/main/v1/order/callback",
    order_id: `TEST-${Date.now()}`,
    info: {}
  });
  console.log(create);

  console.log("====== ✅ ALL TESTS DONE ======");
}

StartTest().catch(console.error);
