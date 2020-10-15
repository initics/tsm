import { State } from './state';

export class InvalidTransitionError extends Error {

    constructor(readonly fromState: State, readonly toState: State) {
        super(`Invalid transition from "${fromState}" to "${toState}"`);
    }

}
