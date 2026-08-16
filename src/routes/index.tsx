//The method used here is called the Route Redirect basically when user will land on the home page or index route ('/') he/she will be redirected to the route which is set by using the BeforeLoad method and redirect function ;p

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/pokemon-explorer" });
  },
});
