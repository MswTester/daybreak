import * as PIXI from "pixi.js";
import { useRef, useEffect } from "react";

const Scene: React.FC<{ width: number; height: number; children:any }> = ({ width, height, children }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<PIXI.Application>();

    useEffect(() => {
        if (canvasRef.current) {
            appRef.current = new PIXI.Application({
                width,
                height,
                backgroundColor: 0x000000,
            });
            canvasRef.current.appendChild(appRef.current.view);

            return () => {
                appRef.current?.destroy(true);
                appRef.current = undefined;
            };
        }
    }, [width, height]);

    return <div ref={canvasRef}>{children}</div>;
};

export default Scene;