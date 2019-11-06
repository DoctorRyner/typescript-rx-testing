import React from 'react'
import Rx from 'rxjs'
import { Maybe, Just, Nothing } from 'purify-ts/Maybe'

export interface Snapshot {
    data: Maybe<number>
    connectionState: number
    error: Maybe<string>
}

interface State {
    snapshot: Snapshot
}

interface Props {
    subject: Rx.Subject<number>
    builder: (a: Snapshot) => JSX.Element
}

export default class BlocBuilder extends React.Component<Props> {
    state: State
    subscription: any

    constructor (props: Props) {
        super (props)
        this.state = { snapshot: { data: Nothing, connectionState: 0, error: Nothing } }
        this.subscription = null
    }

    componentDidMount () {
        this.subscription = this.props.subject.subscribe (
            (data: number) => this.setState ({
                snapshot: {
                    data: Just (data),
                    connectionState: 0,
                    error: Nothing
                }
            }),
            (err: string) => this.setState ({
                snapshot: {
                    data: Nothing,
                    connectionState: 0,
                    error: Just (err)
                }
            }),
            () => this.setState ({ snapshot: { data: Nothing, connectionState: -1, error: Nothing } })
        )
    }

    componentWillUnMount = () => this.subscription.unsubscribe ()

    render = () => this.props.builder (this.state.snapshot)
}

