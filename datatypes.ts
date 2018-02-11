// A simple true/false value
let completed: boolean = true;

// 64-bit floating point numbers
let decimal: number = 10;
let hex: number = 0xffff;
// Notice how TypeScript infers this type correctly
let binary = 0b1100_1010;

let message: string = "Hello, world!";

// Number array
let array: number[] = [1, 2, 3, 4, 5];
// Same thing but typed using generics
let array2: Array<number> = [1, 2, 3, 4, 5];

