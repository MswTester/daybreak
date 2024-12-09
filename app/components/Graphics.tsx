// app/components/Sprite.tsx

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";
import { usePixel } from "./Scene";

interface GraphicsProps {
    transform?: Transform;
    filters?: Filter[];
    draw: (g:PIXI.Graphics) => void;
}

const Graphics = ({ transform = new Transform(), filters = [], draw }:GraphicsProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const graphicsRef = useRef<PIXI.Graphics | null>(null);

    useEffect(() => {
        if (graphicsRef.current) {
            graphicsRef.current.destroy();
        }
        const graphics = new PIXI.Graphics();
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
            draw(graphicsRef.current);
        }
    }, [pixel, draw]);

    useEffect(() => {
        if (graphicsRef.current) {
            graphicsRef.current.position.set(transform.position[0] * pixel, transform.position[1] * pixel);
            graphicsRef.current.setSize(transform.scale[0] * pixel, transform.scale[1] * pixel);
            graphicsRef.current.rotation = transform.rotation;
            graphicsRef.current.alpha = transform.alpha;
            graphicsRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
        }
    }, [transform, filters, pixel]);

    return null;
};

export default Graphics;