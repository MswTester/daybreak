import type { MetaFunction } from "@remix-run/node";
import GameEngine from "~/components/GameEngine";
import { GameStateProvider } from "~/contexts/GameStateContext";
import { useScreen } from "~/contexts/ScreenContext";
import { initialLevel } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "LoomBeat" },
    { name: "description", content: "Visualistic Note Rhythm Game" },
  ];
};

export default function Index() {
  const {width,height,screenSize} = useScreen();
  return (<GameStateProvider>
    <GameEngine level={initialLevel} timeline={0} width={width} height={height} pixelSize={screenSize} />
  </GameStateProvider>);
}
