// app/components/GameEngine.tsx

import { useEffect } from "react";
import { useGameState } from "~/contexts/GameStateContext";
import Scene from "./pixijs/Scene";
import Camera from "./pixijs/Camera";
import Sprite from "./pixijs/Sprite";
import Text from "./pixijs/Text";
import Container from "./pixijs/Container";
import getEventedGameState from "~/utils/eventedState";

interface GameEngineProps {
  timeline: number;
  level: Level;
  autoplay?: boolean;
  width?: number;
  height?: number;
  pixelSize?: number;
  endCallback?: (
    score:number,
    maxCombo:number,
    accuracy:number,
    clear:boolean,
    perfect:boolean,
    great:boolean,
    good:boolean,
    bad:boolean,
    miss:boolean,
  ) => void;
}

const GameEngine = ({ timeline, level, autoplay = false, width = 1200, height = 900, pixelSize, endCallback }:GameEngineProps) => {
  const { gameState, setGameState } = useGameState();

  useEffect(() => {
    setGameState((prev:GameState) => getEventedGameState(prev, level, timeline));
  }, [level, timeline]);

  useEffect(() => {
    if(autoplay){
      setGameState((prev:GameState) => {
        return {
          ...prev,
          judged: prev.notelines.flatMap((noteline:NotelineState) => {
            return noteline.notes.map((note:NoteState) => {
              return {
                key: noteline.key,
                time: note.time,
                state: 0,
              }
            });
          }),
        }
      });
    } else {
      const keydown = (e:KeyboardEvent) => {
      }
      const keyup = (e:KeyboardEvent) => {
      }
      window.addEventListener('keydown', keydown);
      window.addEventListener('keyup', keyup);
      return () => {
        window.removeEventListener('keydown', keydown);
        window.removeEventListener('keyup', keyup);
      }
    }
  }, [autoplay])

  return (
    <Scene background={gameState.backgroundColor} width={width} height={height} pixelSize={pixelSize} using={[
      "assets/white.png",
      "assets/black.png",
      "assets/judge.png",
      "assets/note.png",
      "logo.png",
    ]}>
      <Camera screenWidth={width} screenHeight={height} {...gameState.camera.transform} filters={gameState.camera.filters} >
        {gameState.notelines.map((noteline:NotelineState, i:number) => (
          <Container key={noteline.id} {...noteline.transform}>
            <Sprite texture="assets/judge.png" scale={[.2, .8]} />
            <Sprite texture="assets/white.png" scale={[.2, .8]} id={`j${i}`} />
            <Sprite filters={[
              {type: "GlowFilter", data: { distance: 5, outerStrength: 3, innerStrength: 0, color: 0xffffff, quality: .2, alpha: .3 }},
              {type: "BloomFilter", data: { value: 8, strengthX: 10, strengthY: 10 }},
            ]} texture="assets/note.png" scale={[.2, .2]} alpha={.9} mask={`j${i}`} position={[0, .25]} />
            {noteline.notes.map((note:NoteState) => (
              <Sprite filters={[
                {type: "GlowFilter", data: { distance: 5, outerStrength: 3, innerStrength: 0, color: 0xffffff, quality: .2, alpha: .3 }},
                {type: "BloomFilter", data: { value: 8, strengthX: 10, strengthY: 10 }},
              ]} texture="assets/note.png" scale={[.2, .2]} alpha={.9} mask={`j${i}`} position={[0, 0]} />
            ))}
          </Container>
        ))}
        <Text text="Perfect!" position={[0, -.2]} style={{fontSize: .07, align: "center", fill: 0x00ff00, stroke:0x000000, fontWeight: "bold"}} />
      </Camera>
    </Scene>
  );
}

export default GameEngine;