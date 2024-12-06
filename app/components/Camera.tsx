import { useEffect, useRef } from "react";
import { ParentProvider, useParent } from "~/contexts/ParentContext";
import * as PIXI from "pixi.js"
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";
import { usePixel } from "./Scene";

interface CameraProps{
    transform?: Transform;
    filters?: { [key: string]: any };
    children: React.ReactNode;
    screenWidth: number;
    screenHeight: number;
}

const Camera = ({ children, transform = new Transform(), filters = {}, screenWidth, screenHeight }:CameraProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const containerRef = useRef<PIXI.Container>(new PIXI.Container())

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.destroy();
        }
        const container = new PIXI.Container();
        container.label = "Camera";
        containerRef.current = container;
        parent.addChild(container);
        return () => {
            if (containerRef.current){
                parent.removeChild(containerRef.current);
                containerRef.current.destroy();
            }
        }
    }, [parent])

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.position.set(screenWidth / 2, screenHeight / 2);
        }
    }, [screenWidth, screenHeight])

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.pivot.set(transform.position[0] * pixel, transform.position[1] * pixel);
            containerRef.current.scale.set(transform.scale[0], transform.scale[1]);
            containerRef.current.rotation = transform.rotation;
            containerRef.current.alpha = transform.alpha;
            containerRef.current.filters = Object.keys(filters).map((key:string) => toFilter(key, filters[key]));
        }
    }, [transform, filters, pixel])

    return <ParentProvider container={containerRef.current}>{children}</ParentProvider>
}

export default Camera;