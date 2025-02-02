"use strict";
// const message = 'Hello World';
// console.log(message);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
let output = '';
const num = 3.1416;
const header = `
=================================
            TABLA DEL ${num}         
================================= \n
`;
for (let i = 0; i <= 100; i++) {
    output += `${num} x ${i} = ${num * i}\n`;
}
output = header + output;
console.log(output);
const outputPath = `outputs`;
fs_1.default.mkdirSync(outputPath, { recursive: true });
fs_1.default.writeFileSync(`${outputPath}/tabla-${num}.txt`, output, 'utf-8');
console.log(`tabla-${num}.txt created`);
