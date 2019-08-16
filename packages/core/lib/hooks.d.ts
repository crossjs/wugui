import { ICO, IPO, TPriority } from "./types";
declare abstract class Hook {
    abstract hooks: {
        pre: any[];
        post: any[];
    };
    depsMap: Map<string, number>;
    tap(name: string, pre?: (...args: any[]) => any, post?: (...args: any[]) => any, deps?: string[]): void;
}
export declare class InitHook extends Hook {
    hooks: {
        pre: Array<[string, (c: IPO, o: ICO) => any]>;
        post: Array<[string, (c: IPO, o: ICO) => any]>;
    };
    tap(name: string, pre?: (c: IPO, o: ICO) => any, post?: (c: IPO, o: ICO) => any, deps?: string[]): void;
    run(c: ((name: string) => IPO), o: ICO, d: TPriority): Promise<any>;
}
export declare class ParseHook<A, B> extends Hook {
    hooks: {
        pre: Array<[string, (a: A, b: B, c: IPO, o: ICO) => any]>;
        post: Array<[string, (a: A, b: B, c: IPO, o: ICO) => any]>;
    };
    tap(name: string, pre?: (a: A, b: B, c: IPO, o: ICO) => any, post?: (a: A, b: B, c: IPO, o: ICO) => any, deps?: string[]): void;
    run(a: A, b: B, c: ((name: string) => IPO), o: ICO, d: TPriority): Promise<any>;
}
export declare class RenderHook<A> extends Hook {
    hooks: {
        pre: Array<[string, (a: A, c: IPO, o: ICO) => any]>;
        post: Array<[string, (a: A, c: IPO, o: ICO) => any]>;
    };
    tap(name: string, pre?: (a: A, c: IPO, o: ICO) => any, post?: (a: A, c: IPO, o: ICO) => any, deps?: string[]): void;
    run(a: A, c: ((name: string) => IPO), o: ICO, d: TPriority): Promise<any>;
}
export {};
