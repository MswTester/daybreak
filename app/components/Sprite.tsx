import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useParent } from "~/contexts/ParentContext";
import { toFilter } from "~/utils/filter";

interface SpriteProps {
    transform: Transform;
    filters: { [key: string]: any };
    texture: string;
}

const Sprite = ({ transform, filters, texture }:SpriteProps) => {
    const parent = useParent();
    const spriteRef = useRef<PIXI.Sprite | null>(null);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.destroy();
        }
        const sprite = new PIXI.Sprite(PIXI.Texture.from(texture));
        spriteRef.current = sprite;
        parent.addChild(sprite);
        return () => {
            if (spriteRef.current) {
                parent.removeChild(spriteRef.current);
                spriteRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.position.set(transform.position[0], transform.position[1]);
            spriteRef.current.scale.set(transform.scale[0], transform.scale[1]);
            spriteRef.current.rotation = transform.rotation;
            spriteRef.current.alpha = transform.alpha;
            spriteRef.current.pivot.set(transform.pivot[0], transform.pivot[1]);
            spriteRef.current.filters = Object.keys(filters).map((key:string) => toFilter(key, filters[key]));
        }
    }, [transform, filters]);

    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.texture = PIXI.Texture.from(texture);
        }
    }, [texture]);

    return null;
};

export default Sprite;