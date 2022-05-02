const readline = require('readline');
const {program} = require('commander');
require ('colors');
const path = require('path');
const fs = require('fs').promises;

program.option(
  '-f, --file [String]',
  'file to save game results',
  '.game/m2/results/results.txt'
);

program.parse(process.argv)

const logFile = path.join(__dirname, program.opts().file);
const logFileDirectory = path.dirname(logFile)
console.log({logFile, logFileDirectory})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const randomInteger = Math.floor(Math.random() * 10) +1;
console.log(randomInteger);

let count = 1;

function isValid(value){
  if(isNaN(value)) {console.log('Enter a number!'.red);
  return false
  }
  if(value < 1 || value > 10) {
    console.log('Enter number from 1 to 10!'.red);
    return false
  } return true
}

const log = async(data) => {
  try{
  await fs.appendFile(logFile, `${data}\n`);
  console.log('Saving successful.'.green)
  }
  catch(err) {
    console.log('Saving filed!'.red)
  }
}

const gameLoop = () => {
  rl.question('Enter number from 1 to 10: '.yellow, (value) => {
    let n = Number(value);
    !isValid(n) ? gameLoop() : 
    n === randomInteger ?
     (console.log(`You are right! The number is: ${n} you won in ${count} tries!`.green),log(`| ${new Date().toLocaleDateString()} | ${new Date().toLocaleTimeString()} |: you get the right number in ${count} tries. Good job!`).finally(() => rl.close())) :
     (gameLoop(), count += 1, console.log(`You are wrong! Try again!`.red))
  })
}

fs.access(logFile).then(() => gameLoop()).catch(() => {
  fs.mkdir(logFileDirectory, {recursive: true});
  gameLoop()
}).catch(() => {
  console.log('Directory could not be maked'.red);
  process.exit(1)
})

// fs.readdir(__dirname)
//   .then((files) => {
//     return Promise.all(
//       files.map(async (filename) => {
//         const stats = await fs.stat(filename)
//         return {
//           name: filename,
//           size: stats.size,
//           date: stats.mtime,
//           isDir: stats.isDirectory(),
//         }
//       }),
//     );
//   })
//   .then((result) => console.table(result));

  // const textFile = fs.readFile('readme.txt').then(text => {
  //   console.log(text.toString())
  // })

// console.log(process.argv); // node index.js -s Uga Buga. pokazuje argumenty wprowadzone do konsoli

