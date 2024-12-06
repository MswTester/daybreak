import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { ParentProvider } from "~/contexts/ParentContext";

interface SceneProps {
    children?: React.ReactNode;
    width: number;
    height: number;
    background: number;
}

const Scene = ({ children, width, height, background }:SceneProps) => {
    const divRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application | null>(null);

    useEffect(() => {
        if (divRef.current) {
            const app = new PIXI.Application({
                width, height,
                backgroundColor: background
            });
            divRef.current.appendChild(app.canvas);
            appRef.current = app;
        }
    }, []);

    useEffect(() => {
        if (appRef.current) {
            appRef.current.renderer.background.color = background;
        }
    }, [background]);

    useEffect(() => {
        if (appRef.current) {
            appRef.current.renderer.resize(width, height);
        }
    }, [width, height]);
    
    return (<ParentProvider container={appRef.current?.stage || new PIXI.Container()}>
        <div ref={divRef} />
    </ParentProvider>);
};

export default Scene;