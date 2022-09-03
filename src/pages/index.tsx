import { GetServerSideProps } from "next";

import { client, ssrCache } from "../lib/urql";
import { PageDocument, usePageQuery } from "../generated/graphql";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Pricing } from "../components/Pricing";

export default function Home() {
  const [{ data }] = usePageQuery({ variables: { slug: "home" } });

  return (
    <>
      <Hero title={data.page.title} subtitle={data.page.subtitle} />
      <Features />
      <Pricing />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(PageDocument, { slug: "home" }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
