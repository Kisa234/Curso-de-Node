import fs from 'fs';
import { yarg } from './plugins/yargs.plugin';


const {b: base, l: limit, s: show} = yarg;

let output   = '';
const header = `
=================================
            TABLA DEL ${base}         
================================= \n
`;
const outputPath = `outputs`;

for (let i = 0; i <=limit; i++) {
    output += `${base} x ${i} = ${base*i}\n`;
}
output = header + output;


if (show){
    console.log(output);
}

fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, output, 'utf-8');
console.log(`tabla-${base}.txt created`);


