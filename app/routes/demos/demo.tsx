import { Link, useLoaderData } from "react-router";
import type { Route } from "./+types/demo";
import { effectRegistry } from "~/effects/registry";
import { Loader2 } from "lucide-react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }

  const demo = effectRegistry.find((effect) => effect.id === id);
  if (!demo) {
    throw new Response("Not Found", { status: 404 });
  }

  return demo;
}
export default function PostPage({ loaderData }: Route.ComponentProps) {
  const demo = useLoaderData<typeof clientLoader>();

  if (!demo) {
    return null;
  }

  const DemoComponent = demo.component;

  return <DemoComponent />;
}
