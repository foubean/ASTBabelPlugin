const fs = require("fs");
const assert = require("assert");
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

const api = require("./babelPluginAPI.js");

//传入函数的参数集合
var FuncParamSet = new Set();
//函数内部新定义的变量集合
var FuncNewSet = new Set();
//函数中所有出现的变量集合
var FuncVariableSet = new Set();

const visitor = {
        "FunctionDeclaration|FunctionExpression"(path) {
            //list
            var paramArray = path.node.params;
            paramArray.forEach(function (element) {
                FuncParamSet.add(element.name);
                // 跳出深度遍历
                path.skip();
            });
            path.traverse({
                //函数块
                BlockStatement(path) {
                    path.traverse({
                        //成员变量
                        MemberExpression(path){
                            var memberNameStack = [];
                            path.traverse({
                                Identifier(path) {
                                    //string
                                    memberNameStack.push(path.node.name);
                                }
                            });
                            // 跳出深度遍历
                            path.skip();
                            FuncVariableSet.add(memberNameStack.join("."));
                            // FuncVariableSet.add(api.getMemberExpressionFullName(path));
                        },
                        //变量
                        Identifier(path) {
                            //string
                            FuncVariableSet.add(path.node.name);
                        },
                        //函数声明
                        FunctionDeclaration(path) {
                            //string
                            FuncNewSet.add(path.node.id.name);
                        },
                        //变量声明
                        VariableDeclaration(path) {
                            //list
                            var declarationArray = path.node.declarations;
                            declarationArray.forEach(function (element) {
                                FuncNewSet.add(element.id.name);
                            });
                        },
                    })
                }
            })
          },
};

const code = fs.readFileSync("test.js").toString();
  
const ast = parser.parse(code);

traverse.default(ast, visitor);

console.log(FuncParamSet);
console.log(FuncNewSet);
console.log(FuncVariableSet);