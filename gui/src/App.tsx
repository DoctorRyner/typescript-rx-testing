import React from 'react'
// import * as Rx from 'rxjs'
import CounterBloc from './CounterBloc'
import BlocBuilder, { Snapshot } from './components/BlocBuilder'

const App: React.FC = () => {
    const bloc = new CounterBloc ()
    return <div>
        <BlocBuilder
            builder={(snapshot: Snapshot) =>
                snapshot.error.caseOf ({
                    Just: (err: string) => <div>Error: <code>{err}</code></div>,
                    Nothing: () => <div>The count has the current value of {snapshot.data.orDefault (0)}</div>
                })
            }
            subject={bloc.getCounterSubject ()}
        />

        <button onClick={bloc.inc}>+</button>
        <button onClick={bloc.dec}>-</button>
        <button onClick={bloc.err}>Simulate error</button>
    </div>
}

export default App
