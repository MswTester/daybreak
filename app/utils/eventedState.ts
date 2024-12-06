import { easing } from "./ease";
import { Transform } from "./modules";
import PIXI from "pixi.js";

const calcProgress = (timeline:number, time:number, duration:number):number => {
    return Math.min(1, Math.max(0, (timeline - time) / duration));
}

const getEventedTransform = (transform:Transform, timeline:number, events:GameEvent[]):Transform => {
    return events.reduce((acc:Transform, event:GameEvent) => {
        if (event.type === "position"){
            const start = event.data.start || transform.position;
            const end = event.data.end || transform.position;
            const x = start[0] + (end[0] - start[0]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            const y = start[1] + (end[1] - start[1]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.position = [x, y];
        } else if (event.type === "rotation"){
            const start = event.data.start || transform.rotation;
            const end = event.data.end || transform.rotation;
            const rotation = start + (end - start) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.rotation = rotation;
        } else if (event.type === "scale"){
            const start = event.data.start || transform.scale;
            const end = event.data.end || transform.scale;
            const x = start[0] + (end[0] - start[0]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            const y = start[1] + (end[1] - start[1]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.scale = [x, y];
        } else if (event.type === "alpha"){
            const start = event.data.start || transform.alpha;
            const end = event.data.end || transform.alpha;
            const alpha = start + (end - start) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.alpha = alpha;
        } else if (event.type === "pivot"){
            const start = event.data.start || transform.pivot;
            const end = event.data.end || transform.pivot;
            const x = start[0] + (end[0] - start[0]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            const y = start[1] + (end[1] - start[1]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.pivot = [x, y];
        } else if (event.type === "tint"){
            const start = event.data.start || transform.tint;
            const end = event.data.end || transform.tint;
            const tint = start + (end - start) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.tint = tint;
        }
        return acc;
    }, transform);
};

const getEventedFilters = (filters:{[key:string]:any}, timeline:number, events:GameEvent[]):{[key:string]:any} => {
    return events.reduce((acc:{[key:string]:any}, event:GameEvent) => {
        if (event.type === "bloomFilter"){
            const start = event.data.start || filters.bloomFilter;
            const end = event.data.end || filters.bloomFilter;
            const blurX = start[0] + (end[0] - start[0]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            const blurY = start[1] + (end[1] - start[1]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            const quality = start[2] + (end[2] - start[2]) * easing(calcProgress(timeline, event.time, event.duration), event.ease);
            acc.bloomFilter = [blurX, blurY, quality];
        }
        return acc;
    }, filters);
};

const getEventedGameState = (prev:GameState, level:Level, timeline:number):GameState => {
    const { judged } = prev;
    const notelines:NotelineState[] = level.notelines.map((noteline:Noteline, i) => {
        const id:string = `noteline-${i}`;
        const transform:Transform = getEventedTransform(noteline.transform, timeline, noteline.events);
        const filters:{[key:string]:any} = getEventedFilters(noteline.filters, timeline, noteline.events);
        const bpm:number = noteline.bpm;
        const key:string = noteline.key;
        const notes:NoteState[] = noteline.notes.map((note:Note, j) => {
            const id:string = `note-${i}-${j}`;
            const transform:Transform = new Transform();
            const time:number = note[0];
            const type:number = note[1];
            const hit:number = 0;
            const judgement:number = 0;
            return {
                id,
                transform,
                filters,
                time,
                type,
                hit,
                judgement,
            }
        });
        return {
            id,
            transform,
            filters,
            bpm,
            key,
            notes,
        }
    });
    const sprites:SpriteState[] = level.sprites.map((sprite, i) => {
        const id:string = `sprite-${i}`;
        const transform:Transform = getEventedTransform(sprite.transform, timeline, sprite.events);
        const filters:{[key:string]:any} = getEventedFilters(sprite.filters, timeline, sprite.events);
        const texture:string = sprite.events.reduce((acc:string, event:GameEvent) => {
            if (event.type === "texture"){
                return event.data.start || event.data.end;
            }
            return acc;
        }, sprite.texture);
        return {
            id,
            transform,
            filters,
            texture,
        }
    });
    const texts:TextState[] = level.texts.map((text:Text, i) => {
        const id:string = `text-${i}`;
        const transform:Transform = getEventedTransform(text.transform, timeline, text.events);
        const filters:{[key:string]:any} = getEventedFilters(text.filters, timeline, text.events);
        const style:PIXI.TextStyle = text.style;
        const textString:string = text.text;
        return {
            id,
            transform,
            filters,
            text: textString,
            style,
        }
    });
    return {
        ...prev,
        backgroundColor: level.backgroundColor,
        timeline,
        judged,
        notelines,
        sprites,
        texts,
    };
};

export default getEventedGameState;