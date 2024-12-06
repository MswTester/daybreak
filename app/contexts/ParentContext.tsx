// app/contexts/ParentContext.tsx

import { createContext, useContext } from "react";
import * as PIXI from "pixi.js";

// PIXI Container Context 생성
const ParentContext = createContext<PIXI.Container | null>(null);

// ParentContext 제공자 컴포넌트
export const ParentProvider = ({ container, children }: { container: PIXI.Container; children: React.ReactNode }) => {
    return <ParentContext.Provider value={container}>{children}</ParentContext.Provider>;
};

// useParent 훅 구현
export const useParent = () => {
    const parent = useContext(ParentContext);
    if (!parent) {
        throw new Error("useParent must be used within a ParentProvider");
    }
    return parent;
};
