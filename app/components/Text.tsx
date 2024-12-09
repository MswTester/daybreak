// app/components/Text.tsx

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";
import { usePixel } from "./Scene";

interface TextProps {
    transform?: Transform;
    filters?: Filter[];
    text: string;
    style: PIXI.TextStyle;
}

const Text = ({ transform = new Transform(), filters = [], text, style }:TextProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const textRef = useRef<PIXI.Text | null>(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.destroy();
        }
        const textSprite = new PIXI.Text(text, style);
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
        if (textRef.current) {
            textRef.current.position.set(transform.position[0] * pixel, transform.position[1] * pixel);
            textRef.current.rotation = transform.rotation;
            textRef.current.alpha = transform.alpha;
            textRef.current.anchor.set(transform.pivot[0], transform.pivot[1]);
            textRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
        }
    }, [transform, filters, pixel]);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.text = text;
            textRef.current.style = {
                ...textRef.current.style,
                ...style,
                fontSize: style.fontSize * pixel
            };
        }
    }, [text, style]);

    return null;
};

export default Text;