// app/components/pixijs/Camera.tsx

import { useEffect, useRef } from "react";
import { ParentProvider, useParent } from "~/contexts/ParentContext";
import * as PIXI from "pixi.js"
import { toFilter } from "~/utils/filter";
import { usePixel } from "./Scene";

interface CameraProps extends ObjectProps {
    children: React.ReactNode;
    screenWidth: number;
    screenHeight: number;
}

const Camera = ({ id, children, position = [0, 0], rotation = 0, scale = [1, 1], alpha = 1, filters = [], blendMode, screenWidth, screenHeight }:CameraProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const containerRef = useRef<PIXI.Container | null>(null);

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.destroy();
        }
        const container = new PIXI.Container();
        container.label = id || "Camera";
        container.blendMode = blendMode || "";
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
        if (containerRef.current) containerRef.current.pivot.set(position[0] * pixel, position[1] * pixel);
    }, [position, pixel]);
    
    useEffect(() => {
        if(containerRef.current) containerRef.current.rotation = rotation;
    }, [rotation])
    
    useEffect(() => {
        if(containerRef.current) containerRef.current.scale.set(scale[0], scale[1]);
    }, [scale])

    useEffect(() => {
        if(containerRef.current) containerRef.current.alpha = alpha;
    }, [alpha])

    useEffect(() => {
        if(containerRef.current) containerRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
    }, [filters])

    useEffect(() => {
        if(containerRef.current) containerRef.current.blendMode = blendMode || "";
    }, [blendMode])

    return <ParentProvider container={containerRef.current || new PIXI.Container()}>{children}</ParentProvider>
}

export default Camera;