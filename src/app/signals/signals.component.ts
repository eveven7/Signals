import { NgFor } from "@angular/common";
import { Component, computed, effect, signal } from "@angular/core";

@Component({
  selector: "app-signals",
  templateUrl: "./signals.component.html",
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(()=> this.counter() *2);
  constructor (){
    effect(()=> console.log(this.counter()))//reexecute this code
  }

  increment() {
    // this.counter.update((oldcounter) => oldcounter + 1);
    this.counter.set(this.counter()+1)
    this.actions.mutate((oldvalue) => oldvalue.push("INCREMENT"));
    // this.actions.push("INCREMENT");
  }

  decrement() {
    this.counter.update((oldcounter) => oldcounter - 1);
    this.actions.update((oldActions) => [...oldActions, "DECREMENT"]);
  }
}
