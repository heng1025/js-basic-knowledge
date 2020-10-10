setTimeout(() => console.log(4));

async function main() {
  console.log(1);
  await Promise.resolve();
  console.log(3);
}

main();

console.log(2);
