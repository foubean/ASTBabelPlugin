const fs = require("fs");
const assert = require('assert');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

function isVarExist(code, variable, scopeId) {
    return getVarInitValue(code, variable, scopeId).isExist;
}

function getVarInitValue(code, variable, scopeId) {
    const ast = parser.parse(code);
    var ret = {
        isExist: false,
        init: undefined
    }
    traverse.default(ast, {
        "VariableDeclaration"(path) {
            if (path.parentPath.node.type !== "ForOfStatement" && path.parentPath.node.type !== "IfStatement") {
                var uid = path.scope.uid;
                if (uid === scopeId) {
                    for (let j of path.node.declarations) {
                        if (variable === j.id.name) {
                            ret.isExist = true;
                            ret.init = j.init;
                        };
                    }
                    return;
                }
            }
        }
    })

    return ret;
}

function getVarReferences(code, variable, scopeId) {
    const ast = parser.parse(code);
    var ret = {
        isExist: false,
        referCount: 0,
        references: undefined
    }
    traverse.default(ast, {
        "Program|BlockStatement"(path) {
            var uid = path.scope.uid;
            if (uid === scopeId) {
                // console.log(path.node.declarations.length);
                let bindings = path.scope.bindings;
                for (let _b in bindings) {
                    if (_b === variable) {
                        ret.isExist = true;
                        ret.referCount = bindings[_b].references;
                        ret.references = [];
                        for (let _p of bindings[_b].referencePaths) {
                            ret.references.push(_p.parentPath);
                        }
                    }
                }
            }
            return;
        }
    })

    return ret;
}

const code = fs.readFileSync("payload.js").toString();


var r = getVarReferences(code, "Lf", 0);
console.log(r.references[0].parentPath.parentPath.toString());