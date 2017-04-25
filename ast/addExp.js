module.exports = class AddExp {
  constructor(op, addexp, mullexp) {
    this.op = op;
    this.addexp = addexp;
    this.mullexp = mullexp;
  }

  toString() {
    return `(AddExp ${this.addexp} ${this.op} ${this.mullexp})`;
  }

  analyze(context) {
    this.addexp.analyze(context);
    this.mullexp.analyze(context);
  }
};