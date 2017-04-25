const Type = require("../ast/type");

Type.INT = new Type("int");
Type.FLOAT = new Type("float");
Type.STRING = new Type("string");
Type.BOOL = new Type("bool");
Type.CHAR = new Type("char");

module.exports = class ExpTernary {
    constructor(op, matchexp1, matchexp2, matchexp3) {
        this.matchexp1 = matchexp1;
        this.matchexp2 = matchexp2;
        this.matchexp3 = matchexp3;
    }

    analyze(context) {
        this.matchexp1.analyze(context);
        if (this.matchexp1.type !== Type.BOOL) {
            throw new Error("Ternary expression requires boolean as first argument.");
        }
        this.matchexp2.analyze(context);
        this.matchexp3.analyze(context);
    }

    toString() {
        return `(Exp_ternary ${this.matchexp1} ? ${this.matchexp2} : ${this.matchexp3})`;
    }
};
