export type Identifier = number;

export type Dispatcher<T = unknown, R = void> = (model?: T) => R;

export interface IPresenter {
    constructor(dispacth: Dispatcher): void;
    viewModel: unknown;
    present(...args: unknown[]): unknown;
}

export interface IUseCase {
    execute(...args: unknown[]): unknown;
}
