import { useEffect, useState } from "react";
import Scene from "./scene";

interface EngineState {
    timeline: number;
    events: Event[];
    charts: number[][];
    judged: number[];
}

const Engine = () => {
    const [state, setState] = useState<EngineState>({
        timeline: 0,
        events: [] as Event[],
        charts: [[], [], [], []] as number[][],
        judged: [] as number[],
    });
    
    useEffect(() => {
        let animationFrame: number;
        const update = () => {
            setState(prev => ({ ...prev, timeline: prev.timeline + 1 }));
            animationFrame = requestAnimationFrame(update);
        };
        animationFrame = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationFrame);
    }, []);    

    useEffect(() => {
        // handle judge text
    }, [state.judged])

    const noteProps = { bpm: 196, src: "assets/note1.svg", timeline: state.timeline };

    return <Scene width={1920} height={1080}>
        daybreak
    </Scene>
}

export default Engine;