/**
 * 抽取函数调用链
 */
"use strict";

const fs = require("fs");
const assert = require("assert");
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

const CallVisitor = {
    CallExpression(path) {
        var switchType = path.node.callee.type;
        switch(switchType){
            case "Identifier":
                //string
                this.FuncCalleeSet.add(path.node.callee.name);
            case "MemberExpression":
                var memberNameStack = [];
                path.traverse({
                    Identifier(path) {
                        //list
                       if(path.listKey === "arguments"){
                            path.skip();
                       }else{
                            memberNameStack.push(path.node.name);
                       }
                    }
                });
                this.FuncCalleeSet.add(memberNameStack.join("."))
        }
    }
};

const FuncVisitor = {
    "FunctionDeclaration"(path) {
        var FuncCalleeSet = new Set();
        FuncCalleeSet.name = path.node.id.name;
        path.traverse(CallVisitor, { FuncCalleeSet });
        console.log(FuncCalleeSet.name);
        console.log(FuncCalleeSet);
      },
    "FunctionExpression"(path) {
        //path.node.id的内容为null，要想获取名字需要前溯path.parent
        var FuncCalleeSet = new Set();
        FuncCalleeSet.name = path.parent.id.name;
        path.traverse(CallVisitor, { FuncCalleeSet });
        console.log(FuncCalleeSet.name);
        console.log(FuncCalleeSet);
    }
}

const code = fs.readFileSync("test.js").toString();
  
const ast = parser.parse(code);

traverse.default(ast, FuncVisitor);
