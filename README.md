# CloudHub TOPUP — Official TopUp System SDK

A simple and powerful TypeScript/JavaScript SDK for integrating with  
**CloudHub TOPUP Public APIs** — groups, items, products, regions, accounts, and orders.

> npm package: cloudhub-topup  
> API Host (staging): https://api-staging.cloudhub.mn  
> API Base: /topup/v1/public  
> Protocol: REST API (Public)

## 📦 Installation

```bash
npm install cloudhub-topup
# or
yarn add cloudhub-topup
```

## 🚀 Quick Start

```ts
import { CloudTopup } from "cloudhub-topup";

const cloud = new CloudTopup({
  HOST: "https://api-staging.cloudhub.mn",
  API_KEY: "YOUR_API_KEY",
  LOGGER: false
});

async function main() {
  const groups = await cloud.public.group.list();
  console.log(groups);
}

main();
```

## 📘 API Overview

Groups:

- group
- item
- product
- region
- account
- order

All APIs:
{HOST}/topup/v1/public/...

## 📜 License

MIT
