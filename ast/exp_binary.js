module.exports = class Exp_binary {
  constructor(op, exp, matchexp) {
    this.op = op;
    this.exp = exp;
    this.matchexp = matchexp;
  }

  toString() {
    return `(Exp_binary ${this.exp} ${this.op} ${this.matchexp})`;
  }
}