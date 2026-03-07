import { client } from "@/sanity/client";
import { Home } from "@/sanity.types";
import { Blocks } from "@/components/flx/sanity/blocks";
import { cache } from "react";

const getHome = cache(async () => {
  const query = `*[_type == "home"][0]{
    _id,
    seo,
    blocks[]
  }`;

  const data = await client.fetch<Home>(query);

  if (!data) return null;

  return data;
});

export default async function HomePage() {
  const homeData = await getHome();

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8 gap-20 flex flex-col">
      <Blocks blocks={homeData?.blocks ?? []} />
    </main>
  );
}
