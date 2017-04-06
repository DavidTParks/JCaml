const fs = require("fs");

const ohm = require("ohm-js");

const parserContents = fs.readFileSync("JCaml.ohm");
const JCamlGrammar = ohm.grammar(parserContents);

class Program {
  contructor(block) {
    this.block = block;
  }

  toString() {
    return `(Program ${this.block})`;
  }
}

class Block {
  constructor(stmt) {
    this.stmt = stmt;
  }

  toString() {
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
  constructor(exp, block, elseBlock, exp2, finalBlock) {
    super();
    this.exp = exp;
    this.block = block;
    this.elseBlock = elseBlock;
    this.exp2 = exp2;
    this.finalBlock = finalBlock;
  }

  toString() {
    let ifString = `(ifStatement if ${this.exp} ${this.block})`;
    for (const exps in this.exp2) {
      ifString += `\n (else if ${this.exp2[exps]})`;
    }
    for (const blocks in this.elseBlock) {
      ifString += `\n (${this.elseBlock[blocks]})`;
    }
    ifString += `\n (else ${this.finalBlock})`;
    return ifString;
  }
}

class Decl extends Stmt {
  constructor(id, exp) {
    super();
    this.id = id;
    this.exp = exp;
  }

  toString() {
    const declString = `(Decl let ${this.id} = ${this.exp})`;
    return declString;
  }
}

class Print extends Stmt {
  constructor(binexp) {
    super();
    this.binexp = binexp;
  }

  toString() {
    return `(Print (${this.binexp}))`;
  }
}

class FuncDec extends Decl {
  constructor(id, params, returnType, body) {
    super(id);
    this.params = params;
    this.body = body;
    this.returnType = returnType;
  }

  toString() {
    const funcDecString = `FuncDec let fun ${this.id} = ${this.params} => ${this.returnType}: ${this.body}`;
    return funcDecString;
  }
}

class FuncCall extends Stmt {
  constructor(id, args) {
    super();
    this.id = id;
    this.args = args;
  }

  toString() {
    return `(funcCall ${this.id} ($this.args))`;
  }
}

class Args {
  constructor(args) {
    this.args = args;
  }

  toString() {
    return `(Args ${this.args})`;
  }
}

class Arg {
  constructor(id) {
    this.id = id;
  }

  toString() {
    return `(Arg ${this.id})`;
  }
}

class Params {
  constructor(params) {
    this.params = params;
  }

  toString() {
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

  toString() {
    const paramString = `Param ${this.id}`;
    return paramString;
  }
}

class ReturnType {
  constructor(id) {
    this.id = id;
  }

  toString() {
    const returnTypeString = `ReturnType ${this.id}`;
    return returnTypeString;
  }
}

class Body {
  constructor(block) {
    this.block = block;
  }

  toString() {
    const bodyString = `(Body :${this.block};;)`;
    return bodyString;
  }
}

class Exp_binary {
  constructor(op, exp, matchexp) {
    this.op = op;
    this.exp = exp;
    this.matchexp = matchexp;
  }

  toString() {
    return `(Exp_binary ${this.exp} ${this.op} ${this.matchexp})`;
  }
}

class Exp_ternary {
  constructor(op, matchexp1, matchexp2, matchexp3) {
    this.matchexp1 = matchexp1;
    this.matchexp2 = matchexp2;
    this.matchexp3 = matchexp3;
  }

  toString() {
    return `(Exp_ternary ${this.matchexp1} ? ${this.matchexp2} : ${this.matchexp3})`;
  }
}

class MatchExp {
  constructor(id, matches) {
    this.id = id;
    this.matches = matches;
  }

  toString() {
    return `(MatchExp match ${this.id} with \n ${this.matches})`;
  }
}

class BinExp {
  constructor(op, binexp, addexp) {
    this.op = op;
    this.binexp = binexp;
    this.addexp = addexp;
  }

  toString() {
    return `(BinExp ${this.binexp} ${this.op} ${this.addexp})`;
  }
}

class AddExp {
  constructor(op, addexp, mullexp) {
    this.op = op;
    this.addexp = addexp;
    this.mullexp = mullexp;
  }

  toString() {
    return `(AddExp ${this.addexp} ${this.op} ${this.mullexp})`;
  }
}

class MullExp {
  constructor(op, mullexp, prefixexp) {
    this.op = op;
    this.mullexp = mullexp;
    this.prefixexp = prefixexp;
  }

  toString() {
    return `(Mullexp ${this.mullexp} ${this.op} ${this.prefixexp})`;
  }
}

class PrefixExp {
  constructor(op, expoexp) {
    this.op = op;
    this.expoexp = expoexp;
  }

  toString() {
    return `(Prefixexp ${this.op} ${this.expoexp})`;
  }
}

class ExpoExp {
  constructor(op, parenexp, expoexp) {
    this.op = op;
    this.parenexp = parenexp;
    this.expoexp = expoexp;
  }

  toString() {
    return `(Expoexp ${this.Parenexp} ${this.op} ${this.Expoexp})`;
  }
}

class ParenExp {
  constructor(parenexp) {
    this.parenexp = parenexp;
  }

  toString() {
    return `(Parenexp (${this.parenexp}))`;
  }
}

class Matches {
  constructor(exp1, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  toString() {
    return `(Matches | ${this.exp1} -> ${this.exp2} \n)`;
  }
}

class Tuplit {
  constructor(exp1, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  toString() {
    return `(Tuplit (${this.exp1}, ${this.exp2}))`;
  }
}

class List {
  constructor(args) {
    this.args = args;
  }

  toString() {
    return `List ${this.args}`;
  }
}

class Numlit {
  constructor(value) {
    this.value = value;
  }
  toString() {
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
  toString() {
    return `(Charlit ${this.value})`;
  }
}

class Stringlit {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return `(Stringlit ${this.value})`;
  }
}

const semantics = JCamlGrammar.createSemantics().addOperation("tree", {
  Program(block) { return new Program(block.tree()); },
  Block(stmt) { return new Block(stmt.tree()); },
  Stmt_if(_1, exp, block, _2, elseIfExprs, elseIfBlocks, _3, finalBlock) {
    return new StatementIfElse(exp.tree(), block.tree(), elseBlock.tree(), finalBlock.tree());
  },
  Decl_decl(_1, id, _2, exp) { return new Decl(id.tree(), exp.tree()); },
  Print_print(_1, _2, binexp, _3) { return new Print(binexp.tree()); },
  FuncDec(_1, id, _2, params, _3, returnType, body) {
    return new FuncDec(id.tree(), params.tree(), returnType.tree(), body.tree());
  },
  FuncCall(id, _1, args, _2) { return new FuncCall(id.tree(), args.tree()); },
  Args(arg) { return new Args(arg.tree()); },
  Arg(id) { return new Arg(id.tree()); },
  Params(_1, firstParam, _2,  moreParams, _3) { return new Params([firstParam.tree()].concat(moreParams.tree())); },
  Param(id) { return new Param(id.tree()); },
  ReturnType(id) { return new ReturnType(id.tree()); },
  Body(_1, block, _2) { return new Body(block.tree()); },
  Exp_binary(exp, op, matchexp) { return new Exp(exp.tree(), op.tree(), addexp.tree()); },
  Exp_ternary(matchexp1, _1, matchexp2, _2, matchexp3) {
    return new Exp(matchexp1.tree(), matchexp2.tree(), matchexp3.tree()); },
  BinExp_binary(binexp, op, addexp) { return new BinExp(op.tree(), binexp.tree(), addexp.tree()); },
  MatchExp_matchexp(_1, id, _2, _3, matches) { return new MatchExp(id.tree(), matches.tree()); },
  AddExp_binary(addexp, op, mullexp) { return new AddExp(addexp.tree(), op.tree(), mullexp.tree()); },
  MullExp_binary(mullexp, op, prefixexp) {
    return new MullExp(mullexp.tree(), op.tree(), prefixexp.tree());
  },
  PrefixExp_binary(op, expoexp) { return new PrefixExp(op.tree(), expoexp.tree()); },
  ExpoExp_binary(parenexp, op, expoexp) {
    return new ExpoExp(parenexp.tree(), op.tree(), expoexp.tree());
},
  ParenExp_parens(_1, parenexp, _2) { return new ParenExp(parenexp.tree()); },
  Matches(_1, exp1, _2, exp2, _3) { return new Matches(exp1.tree(), exp2.tree()); },
  Tuplit(_1, exp1, _2, exp2, _3) { return new Tuplit(exp1.tree(), exp2.tree()); },
  List(args) { return new List(tuplit1.tree(), tuplit2.tree()); }, // to do
  Numlit(value) { return new Numlit(value.tree()); },
  Charlit(_1, value, _2) { return new Charlit(value.sourceString); },
  Stringlit(_1, value, _2) { return new Stringlit(value.sourceString); },
});

function parse(text) {
  const match = JCamlGrammar.match(text);
  return semantics(match).tree();
}
module.exports = parse;
