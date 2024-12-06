import { useEffect, useState } from "react";
import { useGameState } from "~/contexts/GameStateContext";
import { useScreen } from "~/contexts/ScreenContext";
import { ObjectState, Transform } from "~/utils/modules";
import Scene from "./Scene";
import Camera from "./Camera";
import Sprite from "./Sprite";

interface GameEngineProps {
  timeline: number;
  level: Level;
  autoplay?: boolean;
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

const GameEngine = ({ timeline, level, autoplay = false, endCallback }:GameEngineProps) => {
  const { gameState, setGameState } = useGameState();
  const { screenSize, width, height } = useScreen();

  useEffect(() => {
    // level initialization
    setGameState((prev:GameState) => {
      return {
        ...prev,
        backgroundColor: level.backgroundColor,
        timeline: 0,
        judged: [],
        notelines: level.notelines.map((noteline:Noteline, i) => ({
          ...ObjectState.to(noteline, `noteline-${i}`),
          notes: noteline.notes.map((note:Note, j) => ({
            ...ObjectState.to(note, `note-${i}-${j}`),
            time: note[0],
            type: note[1],
            hit: 0,
            judgement: 0,
          })),
          key: noteline.key,
          bpm: noteline.bpm,
        })),
        sprites: level.sprites.map((sprite, i) => ({
          ...ObjectState.to(sprite, `sprite-${i}`),
          texture: sprite.texture,
        })),
        texts: level.texts.map((text, i) => ({
          ...ObjectState.to(text, `text-${i}`),
          text: text.text,
          style: Object.assign({}, text.style),
        })),
        camera: ObjectState.to(level.camera, 'camera'),
        accuracy: 0,
        combo: 0,
        health: 100,
        maxCombo: 0,
        score: 0,
      };
    });
  }, [level]);

  useEffect(() => {
    setGameState((prev:GameState) => ({
      ...prev,
      timeline,
    }));
  }, [timeline]);

  useEffect(() => {
    if(autoplay){
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
    <Scene background={gameState.backgroundColor} width={width} height={height} pixelSize={screenSize}>
      <Camera screenWidth={width} screenHeight={height}>
        <Sprite filters={[]} texture="assets/note.png" />
      </Camera>
    </Scene>
  );
}

export default GameEngine;