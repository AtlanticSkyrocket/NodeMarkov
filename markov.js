/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Creates a chain of words and the words that follow them
    let chains = new Map();
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }


  /** return random text from chains */
  findStartingKey() {
    let keys = Array.from(this.chains.keys());
    let possibleStartingKeys = keys.filter(key => key[0] == key[0].toUpperCase());
    return possibleStartingKeys[Math.floor(Math.random() * possibleStartingKeys.length)];
  }

  makeText(numWords = 100) {
    // Creates a random text of numWords length
    let key = this.findStartingKey();
    let output = [];

    while (output.length < numWords && key !== null) {
      if(numWords > 0)
        key = this.chains.get(key)[Math.floor(Math.random() * this.chains.get(key).length)];
      output.push(key);
    }
    return output.join(" ").trimEnd();
  }
}


module.exports = {
  MarkovMachine
}