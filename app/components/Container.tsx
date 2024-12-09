// app/components/Camera.tsx

import { useEffect, useRef } from "react";
import { ParentProvider, useParent } from "~/contexts/ParentContext";
import * as PIXI from "pixi.js"
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";
import { usePixel } from "./Scene";

interface ContainerProps {
    transform?: Transform;
    filters?: Filter[];
    children: React.ReactNode;
}

const Container = ({ children, transform = new Transform(), filters = [] }:ContainerProps) => {
    const parent = useParent();
    const pixel = usePixel();
    const containerRef = useRef<PIXI.Container>(new PIXI.Container());

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.destroy();
        }
        const container = new PIXI.Container();
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
            containerRef.current.position.set(transform.position[0] * pixel, transform.position[1] * pixel);
            containerRef.current.scale.set(transform.scale[0], transform.scale[1]);
            containerRef.current.rotation = transform.rotation;
            containerRef.current.alpha = transform.alpha;
            containerRef.current.pivot.set(transform.pivot[0] * pixel, transform.pivot[1] * pixel);
            containerRef.current.filters = filters.map((filter:Filter) => toFilter(filter.type, filter.data));
        }
    }, [transform, filters, pixel])

    return <ParentProvider container={containerRef.current}>{children}</ParentProvider>
}

export default Container;