import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/modules")({
  beforeLoad: () => {
    throw redirect({ to: "/how-it-works", replace: true });
  },
  component: () => null,
});
