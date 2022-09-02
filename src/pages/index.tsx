import { GetServerSideProps } from "next";

import { client, ssrCache } from "../lib/urql";
import { PageDocument, usePageQuery } from "../generated/graphql";

export default function Home() {
  const [{ data }] = usePageQuery({ variables: { slug: "home" } });

  return <h1>{data?.page.title}</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(PageDocument, { slug: "home" }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
