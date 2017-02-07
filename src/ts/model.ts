export interface AsyncGetAll<T> {
    getAll: f.Func0<PromiseLike<T[]>>;
}
