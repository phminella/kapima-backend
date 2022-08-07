import "dotenv/config";
/*
Welcome to Keystone! This file is what keystone uses to start the app.

It looks at the default export, and expects a Keystone config object.

You can find all the config options in our docs here: https://keystonejs.com/docs/apis/config
*/

import { config } from "@keystone-6/core";

// Keystone auth is configured separately - check out the basic auth setup we are importing from our auth file.
import { withAuth, session } from "./auth";
// import { statelessSessions } from '@keystone-6/core/session';

// Database URL from .env
const databaseUrl = process.env.DATABASE_URL || "capybara string";
const shadowDatabaseUrl = process.env.SHADOW_DATABASE_URL || "oi";
//@ts-ignore
const port = parseInt(process.env.PORT) || 3000;
// lists schema
import { Product } from "./schemas/Products";
import { User } from "./schemas/User";
import { ProductImage } from "./schemas/ProductImage";
import { CartItem } from "./schemas/CartItem";
import { OrderProduct } from "./schemas/OrderProduct";
import { Order } from "./schemas/Order";
// extend schema
import { extendGraphqlSchema } from "./mutations/index";

export default withAuth(
  // Using the config function helps typescript guide you to the available options.e
  config({
    server: {
      cors: { origin: ["https://kapima.herokuapp.com"], credentials: true },
      port,
      maxFileSize: 200 * 1024 * 1024,
      healthCheck: true,
    },
    db: {
      provider: "postgresql",
      url: databaseUrl,
      onConnect: async (context) => {},
      // Optional advanced configuration
      enableLogging: true,
      useMigrations: false,

      idField: { kind: "uuid" },
    },
    lists: {
      User,
      Product,
      ProductImage,
      CartItem,
      OrderProduct,
      Order,
    },
    extendGraphqlSchema,
    graphql: {
    playground:true
    },
    ui: {
      // TODO: change this for roles
      isAccessAllowed: ({ session }) => {
        return !!session?.data;
      },
    },
    session,
  })
);
