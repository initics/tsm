# tsm - Tiny state machine
Manages state transitions and validates transitions before actually changing the state.

## Examples
Lets say we want to implement a simple music player, that can be started and stopped.

Possible transitions are:
- start: `ready` -> `playing`
- stop: `playing` -> `stopped`

```javascript
const { StateMachine } = require('@initics/tsm');

// Define the initial state as well as possible transitions
const sm = new StateMachine({
    initial: 'ready',
    transitions: [
        { from: 'ready', to: 'playing' },
        { from: 'playing', to: 'stopped' }
    ]
});

console.log('initial state:', sm.state);

// start playing
sm.transition('playing');
console.log('start:', sm.state);

// stop playing
sm.transition('stopped');
console.log('final state:', sm.state);
```

Invalid transitions will throw an error:
```javascript
const { StateMachine } = require('@initics/tsm');

const sm = new StateMachine({
    initial: 'ready',
    transitions: [
        { from: 'ready', to: 'playing' },
        { from: 'playing', to: 'stopped' }
    ]
});

// throws: Invalid trasition from "ready" to "stopped"
sm.transition('stopped');
```

Lets implement a more "sophisticated" music player, that can not only be started and stopped, but also paused and resumed.

Possible transitions are:
- start: `ready` -> `playing`
- pause: `playing` -> `paused`
- stop: `playing` -> `stopped`
- resume: `paused` -> `playing`
- stop: `paused` -> `stopped`

```javascript
const { StateMachine } = require('@initics/tsm');

const sm = new StateMachine({
    initial: 'ready',
    transitions: [
        { from: [ 'ready', 'paused' ], to: 'playing' },
        { from: 'playing', to: 'paused' },
        { from: [ 'playing', 'paused' ], to: 'stopped' }
    ]
});

console.log('initial state:', sm.state);

sm.transition('playing');
console.log('start:', sm.state);

sm.transition('paused');
console.log('pause:', sm.state);

sm.transition('playing');
console.log('resume:', sm.state);

sm.transition('stopped');
console.log('final state:', sm.state);

```