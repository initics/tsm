import { State } from './state';
import { InvalidtTransitionError } from './invalid-transition.error';

interface StateMachineTransition {

    from: State | State[];
    to: State;

}

export interface StateMachineDefinition {

    initial: State;
    transitions: StateMachineTransition[];

}

export class StateMachine {

    private _state: State;

    constructor(private definition: StateMachineDefinition) {
        this._state = this.definition.initial;
    }

    get state(): State {
        return this._state;
    }

    transition(to: State): void {
        if (this.canTransition(this._state, to)) {
            this._state = to;
        }
        else {
            throw new InvalidtTransitionError(this._state, to);
        }
    }

    private canTransition(from: State, to: State): boolean {
        return !! this.definition.transitions.find(item => {
            return (
                (
                    Array.isArray(item.from) &&
                    item.from.includes(from)
                ) || item.from === from
            ) && item.to === to;
        });
    }

}
