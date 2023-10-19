/** Command-line tool to generate Markov text. */
const fs = require('fs').promises;
const { MarkovMachine } = require('./markov');
const { argv } = require('process');
const axios = require('axios');
async function main() {
  function createPath(path) {
    if (path.startsWith('./') || path.startsWith('../')) {
      return path;
    }
    return './' + path;
  }

  function generateText(text) {
    try {
      let mm = new MarkovMachine(text);
      return mm.makeText();
    }
    catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  async function getTextFromFile(path) {
    path = createPath(path);
    try {
      const data = await fs.readFile(path, 'utf8');
      const text = generateText(data);
      console.log(text);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  async function getTextFromUrl(url) {
    try {
      let { data } = await axios.get(url);
      const text = generateText(data);
      console.log(text);
    }
    catch (err) {
      console.log(`Cannot read URL: ${url}: ${err}`);
      process.exit(1);
    }
  }

  if (argv[2] == 'file') {
    await getTextFromFile(argv[3]);
  }
  else if (argv[2] == 'url') {
    await getTextFromUrl(argv[3]);
  }
  else {
    console.log('Please enter a valid command');
    process.exit(1);
  }
  process.exit(0);
}
main();