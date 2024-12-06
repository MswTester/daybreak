import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "BeatMix" },
    { name: "description", content: "Visualistic Note Rhythm Game" },
  ];
};

export default function Index() {
  return (
    <h1>hi</h1>
  );
}
