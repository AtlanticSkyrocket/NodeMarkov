const MarkovMachine = require('./markov').MarkovMachine;

describe("MarkovMachine", function () {
  test("MarkovMachine can be instantiated", function () {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm).toBeInstanceOf(MarkovMachine);
    expect(mm).toHaveProperty("words");
    expect(mm).toHaveProperty("chains");
    expect(mm).toHaveProperty("makeChains");
  });
});

describe("makeChains", function () {
  test("makes chains", function () {
    let mm = new MarkovMachine("the cat in the hat");
    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the"]],
        ["hat", [null]],
      ])
    );
  });
});

describe("makeText", function () {
  test("makes text", function () {
    let mm = new MarkovMachine("The cat in the hat");
    let text = mm.makeText();
    expect(text.split(" ").length).toBeLessThanOrEqual(100);
    expect(mm.words.includes(text.split(" ")[0])).toEqual(true);
    expect(mm.words.includes(text.split(" ")[99])).toEqual(false);
  });
});

describe("findStartingKey", function () {
  test("finds starting key", function () {
    let mm = new MarkovMachine("The cat in the hat");
    expect(mm.findStartingKey()).toEqual("The");
  });
});

