declare namespace __React {
    interface WithChildren {
        children?: ReactNode[];
    }

    type SomeComponent<T> = StatelessComponent<T> | ComponentClass<T>;

    interface FormEvent {
        target: HTMLInputElement;
    }
}