import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP Effect Gallery" },
    { name: "description", content: "Collection of GSAP effect demos" },
  ];
}

export default function Home() {
  return (
    <main className="h-[calc(100vh-4rem)] w-full overflow-hidden bg-zinc-200 text-zinc-100">
      <section className="size-full overflow-hidden grid place-items-center	text-black text-2xl text-center">
        The page is comming soon, please select an effect from the dropdown menu
        above to view the demo.
      </section>
    </main>
  );
}
