const fs = require("fs");
const assert = require('assert');
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

function isFuncExist(code, func, scopeId) {
    return getFuncInitDef(code, func, scopeId).isExist;
}

function getFuncInitDef(code, func, scopeId) {
    const ast = parser.parse(code);
    var ret = {
        isExist: false,
        init: undefined
    }
    traverse.default(ast, {
        // "FunctionExpression"(path) {
        //     // console.assert(path.node.id === null, Error("FunctionExpression 函数有名字，不是匿名函数"));
        //     if (path.parentPath.parentPath.type === "VariableDeclaration") {
        //         var outerPath = path.parentPath.parentPath;
        //         if (outerPath.parentPath.node.type !== "ForOfStatement" && outerPath.parentPath.node.type !== "IfStatement") {
        //             if (Funcs[outerPath.scope.uid.toString()] === undefined) {
        //                 Funcs[outerPath.scope.uid.toString()] = [];
        //                 for (let j of outerPath.node.declarations) {
        //                     Funcs[outerPath.scope.uid.toString()].push(j.id.name);
        //                 }
        //             } else {
        //                 for (let j of outerPath.node.declarations) {
        //                     Funcs[outerPath.scope.uid.toString()].push(j.id.name);
        //                 }
        //             }
        //         } else {
        //             path.skip();
        //         }
        //     }
        // },
        "FunctionDeclaration"(path) {
            // console.log(path.parentPath.scope.uid);
            // console.log(path.toString());
            var uid = path.parentPath.scope.uid;
            var name = path.node.id.name;
            if (path.parentPath.scope.uid === scopeId && name === func) {
                ret.isExist = true;
                ret.init = path.node;
                return;
            }
            path.skip();
        }
    })
    return ret;
}

function getFuncReferences(code, func, scopeId) {
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
                    if (_b === func) {
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

const code = fs.readFileSync("test/test.js").toString();

var r = getFuncReferences(code, "H", 0);
console.log(r.referCount);

var rf = r.references;
for (let i of rf) {
    console.log(i.toString());
}