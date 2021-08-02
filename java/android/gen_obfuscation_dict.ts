/**
 * Created at 2021/8/1 23:15
 *
 * @author Liangcheng Juves
 */

// deno run --allow-write gen_obfuscation_dict.ts

const result = new Set();

const keys = ["l", "I", "1", "O", "o", "0", "$"];

for (let o = 1; o < 100000; o++) {
  for (let len = 6; len < 13; len++) {
    let tmp = keys[Math.floor(Math.random() + 0.5)];
    for (let i = 1; i < len + 1; i++) {
      tmp += keys[Math.floor(Math.random() * keys.length)];
    }
    result.add(tmp);
  }
}

const encoder = new TextEncoder();
const file = Deno.openSync("obfuscation.dict", { write: true, create: true });

for (const item of result) {
  const data = encoder.encode(`${item}\n`);
  Deno.writeSync(file.rid, data);
}

Deno.close(file.rid);

console.log('Generate "obfuscation.dict" successfully!');
