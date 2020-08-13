import { StateMachine, StateMachineDefinition } from './tsm';
import { InvalidtTransitionError } from './invalid-transition.error';

const DEFINITION: StateMachineDefinition = {
    initial: 'ready',
    transitions: [
        { from: 'ready', to: 'running' },
        { from: [ 'running', 'suspended' ], to: 'stopped' },
        { from: 'running', to: 'suspended' },
        { from: 'suspended', to: 'running' }
    ]
};

describe(StateMachine, () => {

    describe('constructor', () => {

        it('should set initial state', () => {
            const initial = 'initial state';
            const instance = new StateMachine({ initial, transitions: [] });
            expect(instance.state).toBe(initial);
        });

    });

    describe('canTransition', () => {

        let sm: StateMachine;
        beforeEach(() => {
            sm = new StateMachine(DEFINITION);
        });

        it('should return true for transition "ready" -> "running"', () => {
            // @ts-ignore
            expect(sm.canTransition('ready', 'running')).toBe(true);
        });

        it('should return true for transition "running" -> "stopped"', () => {
            // @ts-ignore
            expect(sm.canTransition('running', 'stopped')).toBe(true);
        });

        it('should return true for transition "suspended" -> "stopped"', () => {
            // @ts-ignore
            expect(sm.canTransition('suspended', 'stopped')).toBe(true);
        });

        it('should return true for transition "running" -> "suspended"', () => {
            // @ts-ignore
            expect(sm.canTransition('running', 'suspended')).toBe(true);
        });

        it('should return true for transition "suspended" -> "running"', () => {
            // @ts-ignore
            expect(sm.canTransition('suspended', 'running')).toBe(true);
        });

        it('should return false for transition "ready" -> "suspended"', () => {
            // @ts-ignore
            expect(sm.canTransition('ready', 'suspended')).toBe(false);
        });

        it('should return false for transition "ready" -> "stopped"', () => {
            // @ts-ignore
            expect(sm.canTransition('ready', 'stopped')).toBe(false);
        });

    });

    describe('transition', () => {

        let sm: StateMachine;
        beforeEach(() => {
            sm = new StateMachine(DEFINITION);
        });

        it('should transition from "ready" -> "running"', () => {
            sm.transition('running');
            expect(sm.state).toBe('running');
        });

        it('should transition from "running" -> "suspended"', () => {
            sm.transition('running');
            sm.transition('suspended');
            expect(sm.state).toBe('suspended');
        });

        it('should transition from "suspended" -> "running"', () => {
            sm.transition('running');
            sm.transition('suspended');
            sm.transition('running');
            expect(sm.state).toBe('running');
        });

        it('should throw InvalidTransitionError for transition from "ready" -> "stopped"', () => {
            expect(() => sm.transition('stopped')).toThrowError(InvalidtTransitionError);
        });

        it('should throw InvalidTransitionError for transition from "running" -> "running"', () => {
            sm.transition('running');
            expect(() => sm.transition('running')).toThrowError(InvalidtTransitionError);
        });

    });

});
