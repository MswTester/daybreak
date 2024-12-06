import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";
import { usePixel } from "./Scene";

interface SpriteProps {
    transform?: Transform;
    filters?: { [key: string]: any };
    texture: string;
}

const Sprite = ({ transform = new Transform(), filters = {}, texture }:SpriteProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const spriteRef = useRef<PIXI.Sprite | null>(null);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.destroy();
        }
        const sprite = new PIXI.Sprite(PIXI.Assets.get(texture));
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
        if (spriteRef.current) {
            spriteRef.current.position.set(transform.position[0] * pixel, transform.position[1] * pixel);
            spriteRef.current.setSize(transform.scale[0] * pixel, transform.scale[1] * pixel);
            spriteRef.current.rotation = transform.rotation;
            spriteRef.current.alpha = transform.alpha;
            spriteRef.current.anchor.set(transform.pivot[0], transform.pivot[1]);
            spriteRef.current.filters = Object.keys(filters).map((key:string) => toFilter(key, filters[key]));
        }
    }, [transform, filters, pixel]);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.texture = PIXI.Texture.from(texture);
        }
    }, [texture]);

    return null;
};

export default Sprite;