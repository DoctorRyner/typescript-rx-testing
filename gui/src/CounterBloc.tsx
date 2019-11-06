import * as Rx from 'rxjs'

export default class CounterBloc {
    counterSubject: Rx.BehaviorSubject<number> = new Rx.BehaviorSubject (0)
    getCounterSubject = () => this.counterSubject

    inc = () => this.counterSubject.next (this.counterSubject.getValue () + 1)
    dec = () => this.counterSubject.next (this.counterSubject.getValue () - 1)
    err = () => this.counterSubject.error ("An error simulation")
}
