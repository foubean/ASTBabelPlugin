/**
 * 建立多叉树数据结构
 * 
 */

"use strict";

// 定义单个结点
class Node{
    #streetIndex;
    #houseIndex;
    #degree;
    #info;
    #parentNode;
    #subTree;
    constructor(){
        // 级数序号
        this.#streetIndex = 0;
        // 层内序号
        this.#houseIndex = 0;
        // 度数
        this.#degree = 0;
        // 存储的信息
        this.#info = null;
        // 父节点
        this.#parentNode = null;
        // 子树
        this.#subTree = [];
    };

    // 结点所在的层数
    get streetIndex(){
        return this.#streetIndex;
    }

    // 结点的度数
    get degree(){
        return this.#subTree.length;
    };
    
    // 结点存储的信息
    get info(){
        return this.#info;
    };

    //父节点
    get parentNode(){
        return this.#parentNode;
    }

    // 结点的子树
    get subTree(){
        return this.#subTree;
    };

    // 供外部调用设置伪属性值来设置结点的序号的值
    set streetIndex(value){
        if(typeof(value) === "number"){
            this.#streetIndex = value;
        }else{
            throw console.error("非法的赋值语句");
        }
    };

    // 供外部调用设置伪属性值来设置结点的序号的值
    set houseIndex(value){
        if(typeof(value) === "number"){
            this.#houseIndex = value;
        }else{
            throw console.error("非法的赋值语句");
        }
    }

    // 供外部调用设置伪属性info的值来设置结点存储的信息
    set info(value){
        this.#info = value;
    };

    // 设置父结点
    set parentNode(value){
        if(value instanceof Node){
            if(this.#parentNode === null){
                this.#parentNode = value;
            }else {
                throw console.error("父节点只能被赋值一次");
            };
        }else{
            throw console.error("非法的赋值语句");
        }
    }

    // 插入一个子结点
    insertSonNode(sonNode){
        if(sonNode instanceof Node){
            this.#subTree.push(sonNode);
            sonNode.parentNode = this;
        }else{
            throw console.error("插入子节点失败");
        }
    }
};

// 定义树
class Tree{
    #root;
    #totalNodeCounter;
    #subNodeCounter;
    constructor(){
        // 根节点
        this.#root = new Node();
        // 总节点数（树的长度）
        this.#totalNodeCounter = 1;
        // 子节点数
        this.#subNodeCounter = 0;
    };

    get root(){
        return this.#root;
    };

    get totalNodeCounter(){
        return this.#totalNodeCounter;
    };

    get subNodeCounter(){
        return this.#subNodeCounter;
    };

    // 根据坐标获取结点
    getNode(streetIndex, houseIndex){

    };

    // 获取某个结点的兄弟结点
    getbrotherNode(node){
        if(node instanceof Node){
            var totalTree = node.parentNode.subTree;
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                };
            };
            totalTree.remove(node);
            return totalTree;
        }else{
            throw console.error("错误的结点类型");
        };
    };

    // 在某个位置插入结点
    insert(parentNode, sonNode){
        parentNode.insertSonNode(sonNode);
        sonNode.streetIndex = parentNode.streetIndex + 1;
        // sonNode.houseIndex = 0;
        this.#totalNodeCounter += 1;
        this.#subNodeCounter += 1;
    };

    // 获取某个结点的子树
    subTree(subRootNode){
        return subRootNode.subTree;
    };

};

// 给每个结点一个唯一编号
//结点要能实现回溯
const _Tree = Tree;
const _Node = Node;
exports.Tree = _Tree;
exports.Node = _Node;
// export { #Tree as Tree };