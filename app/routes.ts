import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("demos/:id", "./routes/demos/demo.tsx"),
] satisfies RouteConfig;
