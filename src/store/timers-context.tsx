import { type ReactNode, createContext, useContext, useReducer } from 'react';

export type Timer = {
    name: string,
    duration: number
}

type TimersState = {
    timers: Timer[],
    isRunning: boolean;
}
const initialState: TimersState = {
    timers: [],
    isRunning: true,
}
type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void,
}

const TimersContext = createContext<TimersContextValue | null>(null)

export function UseTimersContext() {
    const ctx = useContext(TimersContext)
    if (ctx === null) {
        throw Error("Something went wrong!")
    }
    return ctx;
}
type TimersContextProviderProps = {
    children: ReactNode,
}
type StartTimersAction = {
    type: 'START-TIMERS'
}
type StopTimersAction = {
    type: 'STOP-TIMERS'
}
type AddTimerAction = {
    type: 'ADD-TIMER',
    payload: Timer
}
type Action = StartTimersAction | StopTimersAction | AddTimerAction

function timersReducer(state: TimersState, action : Action): TimersState {
    if (action.type === 'START-TIMERS') {
        return {
            ...state,
            isRunning: true,
        }
    }
    if (action.type === 'STOP-TIMERS') {
        return {
            ...state,
            isRunning: false,
        }
    }
    if (action.type === 'ADD-TIMER') {
        return {
            ...state,
            timers: [...state.timers, {
                name: action.payload.name,
                duration: action.payload.duration,
            }],
        }
    }
    return state;
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState)
    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({ type: 'ADD-TIMER', payload: timerData })
        },
        startTimers() {
            dispatch({ type: 'START-TIMERS' })
        },
        stopTimers() {
            dispatch({ type: 'STOP-TIMERS' })
        },
    }
    return <TimersContext.Provider value={ctx}> {children}</TimersContext.Provider>
}
