// app/utils/eventedState.ts

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

const getEventedFilters = (filters:Filter[], timeline:number, events:GameEvent[]):Filter[] => {
    return events.reduce((acc:Filter[], event:GameEvent) => {
        const start = event.data.start;
        const end = event.data.end;
        const data = start.map((start:number, i:number) => start + (end[i] - start) * easing(calcProgress(timeline, event.time, event.duration), event.ease));
        const all = acc.filter((filter:Filter) => filter.type === event.type);
        if (all.length > 0){
            if(all[event.data.index]){
                all[event.data.index].data = data;
                return acc;
            } else {
                return [...acc, { type: event.type as FilterName, data }];
            }
        } else {
            return [...acc, { type: event.type as FilterName, data }];
        }
    }, filters);
};

const getEventedBlendMode = (blendMode:PIXI.BLEND_MODES | "", timeline:number, events:GameEvent[]):PIXI.BLEND_MODES | "" => {
    return events.reduce((acc:PIXI.BLEND_MODES | "", event:GameEvent) => {
        if (event.type === "blendMode"){
            if (timeline < event.time) {
                return acc; // 이벤트 시작 전
            } else if (timeline < event.time + event.duration) {
                return event.data.start; // 이벤트 진행 중
            } else {
                return event.data.end; // 이벤트 종료 후
            }
        }
        return acc;
    }, blendMode);
};

const getEventedGameState = (prev:GameState, level:Level, timeline:number):GameState => {
    const { judged } = prev;
    const notelines:NotelineState[] = level.notelines.map((noteline:S_Noteline, i) => {
        const id:string = `noteline-${i}`;
        const transform:Transform = getEventedTransform(noteline.transform, timeline, noteline.events);
        const filters:Filter[] = getEventedFilters(noteline.filters, timeline, noteline.events);
        const blendMode:PIXI.BLEND_MODES | "" = getEventedBlendMode(noteline.blendMode, timeline, noteline.events);
        const mask:string = noteline.mask;
        const bpm:number = noteline.bpm;
        const key:string = noteline.key;
        const notes:NoteState[] = noteline.notes.map((note:S_Note, j) => {
            const id:string = `note-${i}-${j}`;
            const percent:number = calcProgress(timeline, note[0], note[0] + ((60 * 1000) / noteline.bpm * 4)); // 4 beats = 1 measure
            const time:number = note[0];
            const type:number = note[1];
            const hit:number = 0;
            const judgement:number = 0;
            return {
                id,
                percent,
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
            blendMode,
            mask,
            bpm,
            key,
            notes,
        }
    });
    const sprites:SpriteState[] = level.sprites.map((sprite, i) => {
        const id:string = `sprite-${i}`;
        const transform:Transform = getEventedTransform(sprite.transform, timeline, sprite.events);
        const filters:Filter[] = getEventedFilters(sprite.filters, timeline, sprite.events);
        const blendMode:PIXI.BLEND_MODES | "" = getEventedBlendMode(sprite.blendMode, timeline, sprite.events);
        const mask:string = sprite.mask;
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
            blendMode,
            mask,
            texture,
        }
    });
    const texts:TextState[] = level.texts.map((text:S_Text, i) => {
        const id:string = `text-${i}`;
        const transform:Transform = getEventedTransform(text.transform, timeline, text.events);
        const filters:Filter[] = getEventedFilters(text.filters, timeline, text.events);
        const blendMode:PIXI.BLEND_MODES | "" = getEventedBlendMode(text.blendMode, timeline, text.events);
        const mask:string = text.mask;
        const style:PIXI.TextStyle = text.style;
        const textString:string = text.text;
        return {
            id,
            transform,
            filters,
            blendMode,
            mask,
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