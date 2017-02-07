type Func1<T, R> = (x: T) => R;

/**
 * Subset of the functionality of Java's `Optional` type.
 */
interface Optional<T> {
    orElse(other: T): T;
    orElseGet(other: () => T): T;
    filter(predicate: Func1<T, boolean>): Optional<T>;
    flatMap<Result>(fn: Func1<T, Optional<Result>>): Optional<Result>;
    map<Result>(fn: Func1<T, Result>): Optional<Result>;
    ifPresent(action: f.Action1<T>): void;
}

export function empty<T>() {
    return new Empty<T>();
}

export function ofNullable<T>(val: T | null | undefined): Optional<T> {
    return val == null ? empty<T>() : new Some(val);
}

export function of<T>(val: T): Optional<T> {
    return new Some(val);
}

class Some<T> implements Optional<T> {
    constructor (private value: T) {
    }

    public map<Result>(fn: Func1<T, Result>) {
        return new Some(fn(this.value));
    }

    public flatMap<Result>(fn: Func1<T, Optional<Result>>) {
        return fn(this.value);
    }

    public orElse() {
        return this.value;
    }

    public orElseGet() {
        return this.value;
    }

    public filter(predicate: Func1<T, boolean>): Optional<T> {
        return predicate(this.value) ? this : empty<T>();
    }

    public ifPresent(action: f.Action1<T>) {
        action(this.value);
    }
}

class Empty<T> implements Optional<T> {
    public orElse(x: T) {
        return x;
    }

    public orElseGet(other: () => T) {
        return other();
    }

    public map() {
        return new Empty();
    }

    public flatMap() {
        return new Empty();
    }

    public filter() {
        return this;
    }

    public ifPresent() {
        return;
    }
}
