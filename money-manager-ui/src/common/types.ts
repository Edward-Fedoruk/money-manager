export type Dispatcher<T, R = void> = (model?: T) => R;

export interface IUseCase {
    execute(...args: unknown[]): unknown;
}
