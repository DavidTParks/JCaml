const fs = require("fs");

const ohm = require("ohm-js");

const parserContents = fs.readFileSync("JCaml.ohm");
const JCamlGrammar = ohm.grammar(parserContents);

class Program {
  contructor(block) {
    this.block = block;
  }

  static toString() {
    return `(Program ${this.block})`;
  }
}

class Block {
  constructor(stmt) {
    this.stmt = stmt;
  }

  static toString() {
    let stmtString;
    for (const statements in this.stmt) {
      stmtString += `\n (Block ${this.stmt[statements]})`;
    }
    return stmtString;
  }
}

class Stmt {
}

class StatementIfElse extends Stmt {
  constructor(exp, block, elseBlock, finalBlock) {
    this.exp = exp;
    this.block = block;
    this.elseBlock = elseBlock;
    this.finalBlock = finalBlock;
  }

  static toString() {
    let ifString = `(ifStatement if ${this.exp} ${this.block})`;
    for (const blocks in this.elseBlock) {
      ifString += `\n (else if ${this.elseBlock[blocks]})`;
    }
    ifString += `\n (else ${this.finalBlock})`;
    return ifString;
  }
}

class Decl extends Stmt {
  constructor(id, exp) {
    this.id = id;
    this.exp = exp;
  }

  static toString() {
    const declString = `(Decl let ${this.id} = ${this.exp})`;
    return declString;
  }
}

class Print extends Stmt {
  constructor(binexp) {
    this.binexp = binexp;
  }

  static toString() {
    return `(Print spit (${this.binexp}))`;
  }
}

class FuncDec extends Decl {
  constructor(id, params, returnType, body) {
    super(id);
    this.params = params;
    this.body = body;
    this.returnType = returnType;
  }

  static toString() {
    const funcDecString = `FuncDec let fun ${this.id} = ${this.params} => ${this.returnType}: ${this.body}`;
    return funcDecString;
  }
}

class Params {
  constructor(params) {
    this.params = params;
  }

  static toString() {
    let paramsString = "Params (";
    for (const params in this.params) {
      paramsString += `, ${params}`;
    }

    paramsString += ")";
    return paramsString;
  }
}

class Param {
  constructor(id) {
    this.id = id;
  }

  static toString() {
    const paramString = `Param ${this.id}`;
    return paramString;
  }
}

class ReturnType {
  constructor(id) {
    this.id = id;
  }

  static toString() {
    const returnTypeString = `ReturnType ${this.id}`;
    return returnTypeString;
  }
}

class Body {
  constructor(block) {
    this.block = block;
  }

  static toString() {
    const bodyString = `(Body :${this.block};;)`;
    return bodyString;
  }
}

class Exp {
}

class MatchExp extends Exp {
  constructor(id, matches) {
    super();
    this.id = id;
    this.matches = matches;
  }

  static toString() {
    return `(MatchExp match ${this.id} with \n ${this.matches})`;
  }
}

class BinExp extends Exp {
  constructor(binexp, op, addexp) {
    super();
    this.binexp = binexp;
    this.op = op;
    this.addexp = addexp;
  }

  static toString() {
    return `(BinExp ${this.binexp} ${this.op} ${this.addexp})`;
  }
}

class AddExp extends Exp {
  constructor(addexp, op, mullexp) {
    super();
    this.addexp = addexp;
    this.op = op;
    this.mullexp = mullexp;
  }

  static toString() {
    return `(AddExp ${this.addexp} ${this.op} ${this.mullexp})`;
  }
}

class MullExp extends Exp {
  constructor(mullexp, op, prefixexp) {
    super();
    this.mullexp = mullexp;
    this.op = op;
    this.prefixexp = prefixexp;
  }

  static toString() {
    return `(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})`;
  }
}

class PrefixExp extends Exp {
  constructor(op, expoexp) {
    super();
    this.op = op;
    this.expoexp = expoexp;
  }

  static toString() {
    return `(Prefixexp ${this.op} ${this.expoexp})`;
  }
}

class ExpoExp extends Exp {
  constructor(parenexp, op, expoexp) {
    super();
    this.parenexp = parenexp;
    this.op = op;
    this.expoexp = expoexp;
  }

  static toString() {
    return `(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})`;
  }
}

class ParenExp extends Exp {
  constructor(parenexp) {
    super();
    this.parenexp = parenexp;
  }

  static toString() {
    return `(Parenexp (${this.parenexp}))`;
  }
}

class Matches {
  constructor(exp1, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  static toString() {
    return `(Matches | ${this.exp1} -> ${this.exp2} \n)`;
  }
}

class Tuplit {
  constructor(exp1, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  static toString() {
    return `(Tuplit (${this.exp1}, ${this.exp2}))`;
  }
}

class List {
  constructor(args) {
    this.args = args;
  }

  static toString() {
    return `List ${this.args}`;
  }
}

class Numlit {
  constructor(value) {
    this.value = value;
  }
  static toString() {
    let numberString = "(Numlit ";
    for (const numbers in this.value) {
      numberString += `${this.value[numbers]}`;
    }
    numberString += ")";
    return numberString;
  }
}

class Charlit {
  constructor(value) {
    this.value = value;
  }
  static toString() {
    return `(Charlit ${this.value})`;
  }
}

class Stringlit {
  constructor(value) {
    this.value = value;
  }
  static toString() {
    let charString = "(Stringlit ";
    for (const lit in this.value) {
      charString += `${this.value[lit]}`;
    }
    charString += ")";
    return charString;
  }
}

const semantics = JCamlGrammar.createSemantics().addOperation("tree", {
  Program(block) { return new Program(block.tree()); },
  Block(stmt) { return new Block(stmt.tree()); },
  StatementIfElse(exp, block, elseBlock, finalBlock) {
    return new StatementIfElse(exp.tree(), block.tree(), elseBlock.tree(), finalBlock.tree());
  },
  Decl(id, exp) { return new Decl(id.tree(), exp.tree()); },
  Print(stringLit) { return new Print(stringLit.tree()); },
  FuncDec(id, params, returnType, body) {
    return new FuncDec(id.tree(), params.tree(), returnType.tree(), body.tree());
  },
  Params(params) { return new Params(params.tree()); },
  Param(id) { return new Param(id.tree()); },
  ReturnType(id) { return new ReturnType(id.tree()); },
  Body(block) { return new Body(block.tree()); },
  BinExp(binexp, op, addexp) { return new BinExp(binexp.tree(), op.tree(), addexp.tree()); },
  MatchExp(id, matches) { return new MatchExp(id.tree(), matches.tree()); },
  AddExp(addexp, op, mullexp) { return new AddExp(addexp.tree(), op.tree(), mullexp.tree()); },
  MullExp(mullexp, op, prefixexp) {
    return new MullExp(mullexp.tree(), op.tree(), prefixexp.tree());
  },
  PrefixExp(op, expoexp) { return new PrefixExp(op.tree(), expoexp.tree()); },
  ExpoExp(parenexp, op, expoexp) {
    return new ExpoExp(parenexp.tree(), op.tree(), expoexp.tree());
},
  ParenExp(parenexp) { return new ParenExp(parenexp.tree()); },
  Matches(exp1, exp2) { return new Matches(exp1.tree(), exp2.tree()); },
  Tuplit(exp1, exp2) { return new Tuplit(exp1.tree(), exp2.tree()); },
  List(args) { return new List(tuplit1.tree(), tuplit2.tree()); }, // to do
  Numlit(value) { return new Numlit(value.tree()); },
  Charlit(value) { return new Charlit(value.tree()); },
  Stringlit(value) { return new Stringlit(value.tree()); },
});

function parse(text) {
  const match = JCamlGrammar.match(text);
  return semantics(match).ast();
}
module.exports = parse;
