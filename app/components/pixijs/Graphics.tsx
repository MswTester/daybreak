// app/components/pixijs/Sprite.tsx

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { usePixel } from "./Scene";

interface GraphicsProps extends ObjectProps {
    draw: (g:PIXI.Graphics) => void;
}

const Graphics = ({ id, position = [0, 0], rotation = 0, scale = [1, 1], alpha = 1, pivot = [.5, .5], filters = [], blendMode, mask, draw }:GraphicsProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const graphicsRef = useRef<PIXI.Graphics | null>(null);

    useEffect(() => {
        if (graphicsRef.current) {
            graphicsRef.current.destroy();
        }
        const graphics = new PIXI.Graphics();
        graphics.label = id || "Graphics";
        graphics.blendMode = blendMode || "";
        graphics.scale.set(pixel, pixel);
        draw(graphics);
        graphicsRef.current = graphics;
        parent.addChild(graphics);
        return () => {
            if (graphicsRef.current) {
                parent.removeChild(graphicsRef.current);
                graphicsRef.current.destroy();
            }
        };
    }, [parent]);

    useEffect(() => {
        if (graphicsRef.current) {
            graphicsRef.current.clear();
            graphicsRef.current.scale.set(pixel, pixel);
            draw(graphicsRef.current);
        }
    }, [pixel, draw]);
    
    useEffect(() => {
        if (graphicsRef.current) graphicsRef.current.position.set(position[0] * pixel, position[1] * pixel);
    }, [position, pixel]);
    
    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.rotation = rotation;
    }, [rotation])
    
    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.setSize(scale[0] * pixel, scale[1] * pixel);
    }, [scale, pixel])

    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.alpha = alpha;
    }, [alpha])
    
    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.pivot.set(graphicsRef.current.width * pivot[0], graphicsRef.current.height * pivot[1]);
    }, [pivot])

    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
    }, [filters])

    useEffect(() => {
        if(graphicsRef.current) graphicsRef.current.blendMode = blendMode || "";
    }, [blendMode])

    useEffect(() => {
        if(graphicsRef.current && mask) graphicsRef.current.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
    }, [mask])

    return null;
};

export default Graphics;