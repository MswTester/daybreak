import { useEffect, useRef } from "react";
import { ParentProvider, useParent } from "~/contexts/ParentContext";
import * as PIXI from "pixi.js"
import { toFilter } from "~/utils/filter";
import { Transform } from "~/utils/modules";

interface CameraProps{
    transform?: Transform;
    filters?: { [key: string]: any };
    children: React.ReactNode;
}

const Camera = ({ children, transform = new Transform(), filters = {} }:CameraProps) => {
    const parent = useParent();
    const containerRef = useRef<PIXI.Container>(new PIXI.Container())

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
    }, [])

    useEffect(() => {
        if(containerRef.current){
            containerRef.current.pivot.set(transform.position[0], transform.position[1]);
            containerRef.current.setSize(transform.scale[0], transform.scale[1]);
            containerRef.current.rotation = transform.rotation;
            containerRef.current.alpha = transform.alpha;
            containerRef.current.filters = Object.keys(filters).map((key:string) => toFilter(key, filters[key]));
        }
    }, [transform, filters])

    return <ParentProvider container={containerRef.current}>{children}</ParentProvider>
}

export default Camera;