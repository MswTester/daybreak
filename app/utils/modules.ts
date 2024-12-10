// app/utils/modules.ts

import * as PIXI from "pixi.js";

class Transform implements Transform{
    position: Vector2 = [0, 0];
    rotation: number = 0;
    scale: Vector2 = [1, 1];
    alpha: number = 1;
    pivot: Vector2 = [.5, .5];
    tint: number = 0xFFFFFF;
    constructor(position?: Vector2, rotation?: number, scale?: Vector2, alpha?: number, pivot?: Vector2, tint?: number){
        this.position = position || this.position;
        this.rotation = rotation || this.rotation;
        this.scale = scale || this.scale;
        this.alpha = alpha || this.alpha;
        this.pivot = pivot || this.pivot;
        this.tint = tint || this.tint;
    }
    static from(obj: Transform){
        return new Transform(obj.position, obj.rotation, obj.scale, obj.alpha, obj.pivot, obj.tint);
    }
    static clone(obj: Transform){
        return Object.assign({}, obj);
    }
}

class ObjectState implements ObjectState{
    id: string;
    transform: Transform;
    filters: Filter[];
    blendMode: PIXI.BLEND_MODES;
    mask: string;
    constructor(id: string, transform: Transform, filters: Filter[], blendMode: PIXI.BLEND_MODES, mask:string){
        this.id = id;
        this.transform = transform;
        this.filters = filters;
        this.blendMode = blendMode;
        this.mask = mask;
    }
    static from(obj: ObjectState):ObjectState{
        return new ObjectState(obj.id, Transform.from(obj.transform), obj.filters, obj.blendMode, obj.mask);
    }
    static clone(obj: ObjectState):ObjectState{
        return Object.assign({}, obj);
    }
    static to(obj: Object, id: string):ObjectState{
        return new ObjectState(id, Transform.from(obj.transform), obj.filters, obj.blendMode, obj.mask);
    }
}

export { Transform, ObjectState };