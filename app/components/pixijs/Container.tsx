// app/components/pixijs/Camera.tsx

import { useEffect, useRef } from "react";
import { ParentProvider, useParent } from "~/contexts/ParentContext";
import * as PIXI from "pixi.js"
import { toFilter } from "~/utils/filter";
import { usePixel } from "./Scene";

interface ContainerProps extends ObjectProps {
    children: React.ReactNode;
}

const Container = ({ id, children, position = [0, 0], rotation = 0, scale = [1, 1], alpha = 1, pivot = [0, 0], blendMode, mask, filters = [] }:ContainerProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const containerRef = useRef<PIXI.Container | null>(null);

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.destroy();
        }
        const container = new PIXI.Container();
        container.label = id || "Container";
        container.blendMode = blendMode || "";
        if(mask) container.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
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
        if (containerRef.current) containerRef.current.position.set(position[0] * pixel, position[1] * pixel);
    }, [position, pivot, pixel]);

    useEffect(() => {
        if (containerRef.current) containerRef.current.pivot.set(pivot[0] * pixel, pivot[1] * pixel);
    }, [pivot, pixel]);
    
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

    useEffect(() => {
        if(containerRef.current && mask) containerRef.current.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
    }, [mask])

    return <ParentProvider container={containerRef.current || new PIXI.Container()}>{children}</ParentProvider>
}

export default Container;