// Editor.tsx

import { useCallback, useEffect, useState } from "react";
import GameEngine from "~/components/GameEngine";
import { GameStateProvider } from "~/contexts/GameStateContext";
import { initialLevel } from "~/utils/data";

function Editor(){
    const [level, setLevel] = useState<Level>(initialLevel);
    const [timeline, setTimeline] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(1);
    const [playing, setPlaying] = useState<boolean>(false);

    useEffect(() => {
        if(playing){
            const interval = setInterval(() => {
                setTimeline((prev:number) => prev + 100);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [playing]);

    const addBlock = useCallback(() => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                blocks: [
                    ...prev.blocks,
                    {
                        offset: 0,
                        split: 4,
                        length: 4,
                        bpm: 100,
                    }
                ]
            }
        });
    }, []);

    const removeBlock = useCallback((index:number) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                blocks: prev.blocks.filter((block:S_Block, i:number) => i !== index),
            }
        });
    }, []);

    const updateBlock = useCallback((index:number, key:string, value:number) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                blocks: prev.blocks.map((block:S_Block, i:number) => {
                    if(i === index){
                        return {
                            ...block,
                            [key]: value,
                        }
                    } else {
                        return block;
                    }
                }),
            }
        });
    }, []);

    const addSprite = useCallback(() => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                sprites: [
                    ...prev.sprites,
                    {
                        transform: {
                            position: [0, 0],
                            rotation: 0,
                            scale: [1, 1],
                            alpha: 1,
                            pivot: [0.5, 0.5],
                            tint: 0xffffff,
                        },
                        filters: [],
                        blendMode: "",
                        mask: "",
                        events: [],
                        texture: "",
                    }
                ]
            }
        });
    }, []);

    const removeSprite = useCallback((index:number) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                sprites: prev.sprites.filter((sprite:S_Sprite, i:number) => i !== index),
            }
        });
    }, []);

    const updateSprite = useCallback((index:number, key:string, value:any) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                sprites: prev.sprites.map((sprite:S_Sprite, i:number) => {
                    if(i === index){
                        return {
                            ...sprite,
                            [key]: value,
                        }
                    } else {
                        return sprite;
                    }
                }),
            }
        });
    }, []);

    const addText = useCallback(() => {
        const text:S_Text = {
            transform: {
                position: [0, 0],
                rotation: 0,
                scale: [1, 1],
                alpha: 1,
                pivot: [0.5, 0.5],
                tint: 0xffffff,
            },
            filters: [],
            blendMode: "",
            mask: "",
            events: [],
            text: "Text",
            style: {
                fontFamily: "Arial",
                fontSize: 24,
                fill: 0xffffff,
                align: "center",
            },
        }
        setLevel((prev:Level) => {
            return {
                ...prev,
                texts: [...prev.texts, text]
            }
        });
    }, []);

    const removeText = useCallback((index:number) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                texts: prev.texts.filter((text:S_Text, i:number) => i !== index),
            }
        });
    }, []);

    const updateText = useCallback((index:number, key:string, value:any) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                texts: prev.texts.map((text:S_Text, i:number) => {
                    if(i === index){
                        return {
                            ...text,
                            [key]: value,
                        }
                    } else {
                        return text;
                    }
                }),
            }
        });
    }, []);

    const addNote = useCallback((index:number, timing:number, type:number) => {
        setLevel((prev:Level) => {
            return {
                ...prev,
                notelines: prev.notelines.map((noteline:S_Noteline, i:number) => {
                    if(i === index){
                        return {
                            ...noteline,
                            notes: [
                                ...noteline.notes,
                                [timing, type],
                            ]
                        }
                    } else {
                        return noteline;
                    }
                }),
            }
        });
    }, []);

    return (
        <main className="w-full h-full flex flex-col">
            <nav className="w-full">

            </nav>
            <div className="w-full">
                <div></div>
                <div id="preview">
                    <GameStateProvider>
                        <GameEngine level={initialLevel} timeline={timeline} width={1200} height={900} pixelSize={900} />
                    </GameStateProvider>
                </div>
                <div></div>
            </div>
            <footer className="w-full"></footer>
        </main>
    );
}

export default Editor;