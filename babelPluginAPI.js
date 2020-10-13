/**
 * 获取MemberExpression成员表达式的全名
 * 获取FunctionExpression的VariableDeclarator的变量名，即调用该函数的变量名
 */

 "use strict";

// 获取MemberExpression成员表达式的全名
function getMemberExpressionFullName(path){
    var memberNameStack = [];
    path.traverse({
        Identifier(path) {
            //string
            memberNameStack.push(path.node.name);
        }
    });
    // 跳出深度遍历
    path.skip();

    return memberNameStack.join(".");
}

// 未测试 
// 获取FunctionExpression的VariableDeclarator的变量名，即调用该函数的变量名
function getFuncExpressionName(path){
    if(path.parent.type === "VariableDeclarator" && path.parent.init.type === "FunctionExpression"){
        return path.parent.id.name;
    }else{
        return undefined;
    }
}

const _getMemberExpressionFullName = getMemberExpressionFullName;
const _getFuncExpressionName = getFuncExpressionName;

exports.getMemberExpressionFullName = _getMemberExpressionFullName;
exports.getFuncExpressionName = _getFuncExpressionName;