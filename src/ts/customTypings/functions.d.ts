declare namespace f {
    export interface Func0<R> {
        (): R
    }

    export interface Func1<A1, R> {
        (arg1: A1): R
    }

    export interface Func2<A1, A2, R> {
        (arg1: A1, arg2: A2): R
    }

    export interface Func3<A1, A2, A3, R> {
        (arg1: A1, arg2: A2, arg3: A3): R
    }

    export interface Action {
        (): void
    }

    export interface Action1<A1> {
        (arg1: A1): void
    }

    export interface Action2<A1, A2> {
        (arg1: A1, arg2: A2): void
    }

    export interface Action3<A1, A2, A3> {
        (arg1: A1, arg2: A2, arg3: A3): void
    }
}
