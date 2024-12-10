// app/components/pixijs/Text.tsx

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { usePixel } from "./Scene";

interface TextProps extends ObjectProps {
    text: string;
    style: PIXI.TextStyleOptions;
}

const Text = ({ id, position = [0, 0], rotation = 0, alpha = 1, pivot = [.5, .5], filters = [], blendMode, mask, text, style }:TextProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const textRef = useRef<PIXI.Text | null>(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.destroy();
        }
        const textStyle = new PIXI.TextStyle(style);
        textStyle.fontSize = textStyle.fontSize * pixel;
        const textSprite = new PIXI.Text();
        textSprite.text = text;
        textSprite.style = textStyle;
        textSprite.label = id || "Text";
        textSprite.blendMode = blendMode || "";
        if(mask) textSprite.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
        textRef.current = textSprite;
        parent.addChild(textSprite);
        return () => {
            if (textRef.current) {
                parent.removeChild(textRef.current);
                textRef.current.destroy();
            }
        };
    }, [parent]);
    
    useEffect(() => {
        if (textRef.current) textRef.current.position.set(position[0] * pixel, position[1] * pixel);
    }, [position, pixel]);
    
    useEffect(() => {
        if(textRef.current) textRef.current.rotation = rotation;
    }, [rotation])

    useEffect(() => {
        if(textRef.current) textRef.current.alpha = alpha;
    }, [alpha])
    
    useEffect(() => {
        if(textRef.current) textRef.current.anchor.set(pivot[0], pivot[1]);
    }, [pivot])

    useEffect(() => {
        if (textRef.current) {
            textRef.current.text = text;
            textRef.current.style = new PIXI.TextStyle(style);
            textRef.current.style.fontSize = textRef.current.style.fontSize * pixel;
        }
    }, [text, style]);

    useEffect(() => {
        if(textRef.current) textRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
    }, [filters])

    useEffect(() => {
        if(textRef.current) textRef.current.blendMode = blendMode || "";
    }, [blendMode])

    useEffect(() => {
        if(textRef.current && mask) textRef.current.mask = parent.children.find((child) => child.label === mask) as PIXI.Graphics;
    }, [mask])

    return null;
};

export default Text;