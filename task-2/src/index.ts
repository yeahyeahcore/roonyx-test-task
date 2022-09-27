import { counter } from "./utils/counter";

const [getCurrentCounterA, increaseCounterA] = counter(1);

console.log("counterA before increase:", getCurrentCounterA());

increaseCounterA();

console.log("counterA after increase:", getCurrentCounterA());

const [getCurrentCounterB, increaseCounterB] = counter(10);

console.log("counterB before increase:", getCurrentCounterB());

increaseCounterB();

console.log("counterB after increase:", getCurrentCounterB());
console.log("counterA after increase counterB:", getCurrentCounterA());

increaseCounterA();

console.log("counterA after increase:", getCurrentCounterA());
console.log("counterB after increase counterA:", getCurrentCounterB());
