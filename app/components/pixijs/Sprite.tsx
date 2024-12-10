// app/components/Sprite.tsx

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { usePixel } from "./Scene";

interface SpriteProps extends ObjectProps {
    texture: string;
}

const Sprite = ({ id, position = [0, 0], rotation = 0, scale = [1, 1], alpha = 1, pivot = [.5, .5], filters = [], blendMode, mask, texture }:SpriteProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const spriteRef = useRef<PIXI.Sprite | null>(null);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.destroy();
        }
        const sprite = new PIXI.Sprite(PIXI.Texture.from(texture));
        sprite.label = id || "Sprite";
        sprite.blendMode = blendMode || "";
        if(mask) sprite.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
        spriteRef.current = sprite;
        parent.addChild(sprite);
        return () => {
            if (spriteRef.current) {
                parent.removeChild(spriteRef.current);
                spriteRef.current.destroy();
            }
        };
    }, [parent]);

    useEffect(() => {
        if (spriteRef.current) spriteRef.current.position.set(position[0] * pixel, position[1] * pixel);
    }, [position, pixel]);
    
    useEffect(() => {
        if(spriteRef.current) spriteRef.current.rotation = rotation;
    }, [rotation])
    
    useEffect(() => {
        if(spriteRef.current) spriteRef.current.setSize(scale[0] * pixel, scale[1] * pixel);
    }, [scale, pixel])

    useEffect(() => {
        if(spriteRef.current) spriteRef.current.alpha = alpha;
    }, [alpha])
    
    useEffect(() => {
        if(spriteRef.current) spriteRef.current.anchor.set(pivot[0], pivot[1]);
    }, [pivot])
    
    useEffect(() => {
        if(spriteRef.current) spriteRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
    }, [filters])

    useEffect(() => {
        if(spriteRef.current) spriteRef.current.blendMode = blendMode || "";
    }, [blendMode])

    useEffect(() => {
        if(spriteRef.current && mask) spriteRef.current.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
    }, [mask])

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.texture = PIXI.Texture.from(texture);
        }
    }, [texture]);

    return null;
};

export default Sprite;