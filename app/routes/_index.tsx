import type { MetaFunction } from "@remix-run/node";
import GameEngine from "~/components/GameEngine";
import { GameStateProvider } from "~/contexts/GameStateContext";
import { ScreenProvider } from "~/contexts/ScreenContext";

export const meta: MetaFunction = () => {
  return [
    { title: "VeatBreak" },
    { name: "description", content: "Visualistic Note Rhythm Game" },
  ];
};

const testLevel:Level = {
  song: "song",
  artist: "artist",
  difficulty: 1,
  bpm: "160",
  backgroundColor: 0x000000,
  notelines: [
    {
      bpm: 160,
      key: "KeyA",
      notes: [],
      events:[],
      filters:[],
      transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
    },
    {
      bpm: 160,
      key: "KeyA",
      notes: [],
      events:[],
      filters:[],
      transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
    },
    {
      bpm: 160,
      key: "KeyA",
      notes: [],
      events:[],
      filters:[],
      transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
    },
    {
      bpm: 160,
      key: "KeyA",
      notes: [],
      events:[],
      filters:[],
      transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
    },
  ],
  judgement: {
    events:[],
    filters:[],
    transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
  },
  camera: {
    events:[],
    filters:[],
    transform:{position:[0, 0], rotation:0, scale:[0, 0], alpha:1, pivot:[.5, .5], tint:0xffffff},
  },
  sprites: [],
  texts: [],
}

export default function Index() {
  return (<ScreenProvider>
    <GameStateProvider>
      <GameEngine level={testLevel} timeline={0} />
    </GameStateProvider>
  </ScreenProvider>);
}
