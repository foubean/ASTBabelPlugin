/**
 * 把函数看成一个集装箱。输入参数、输出参数。外部看不到里面的细节。
 * 集装箱的内部只有两种东西：参数和箱子。
 * 输入的内容、输出的内容、实际利用的内容、实际更改的内容
 */
"use strict";

const tr = require("./tree.js");

class Box{
    #streetIndex;
    #houseIndex;
    #degree;
    #parentBox;
    #subContainer;
    #info;
    #input;
    #output;
    #content;
    constructor(){
        // 级数序号
        this.#streetIndex = 0;
        // 层内序号
        this.#houseIndex = 0;
        // 度数
        this.#degree = 0;
        // 父箱子
        this.#parentBox = null;
        // 子树
        this.#subContainer = [];
        // 进入前的变量堆栈
        this.#input = [];
        // 返回的内容
        this.#output = []; 
        // 内部引用和新定义的变量、函数
        this.#content = [];
        // 存储的信息
        this.#info = {
            "input": this.#input,
            "output": this.#output,
            "content": this.#content
        };
    };

    // 所在的层数
    get streetIndex(){
        return this.#streetIndex;
    }

    // 度数
    get degree(){
        return this.#subContainer.length;
    };
    
    // 箱子存储的信息
    get info(){
        return this.#info;
    };

    // 父 箱子
    get parentBox(){
        return this.#parentBox;
    }

    // 箱子内部
    get subContainer(){
        return this.#subContainer;
    };

    // 供外部调用设置伪属性值来设置序号的值
    set streetIndex(value){
        if(typeof(value) === "number"){
            this.#streetIndex = value;
        }else{
            throw console.error("非法的赋值语句");
        }
    };

    // 供外部调用设置伪属性值来设置序号的值
    set houseIndex(value){
        if(typeof(value) === "number"){
            this.#houseIndex = value;
        }else{
            throw console.error("非法的赋值语句");
        }
    }

    // 设置父箱子
    set parentBox(value){
        if(value instanceof Box){
            if(this.#parentBox === null){
                this.#parentBox = value;
            }else {
                throw console.error("父箱子只能被赋值一次");
            };
        }else{
            throw console.error("非法的赋值语句");
        }
    }

    addInput(){
        
    }

    // 插入一个子 箱子
    addSonBox(sonBox){
        if(sonBox instanceof Box){
            this.#subContainer.push(sonBox);
            sonBox.parentBox = this;
        }else{
            throw console.error("插入子箱子失败");
        }
    }
};

// 定义树
class BoxContainer{
    #MaxBox;
    #totalBoxCounter;
    #sonBoxCounter;
    constructor(){
        // 根箱子
        this.#MaxBox = new Box();
        // 总箱子数（树的长度）
        this.#totalBoxCounter = 1;
        // 子箱子数
        this.#sonBoxCounter = 0;
    };

    get MaxBox(){
        return this.#MaxBox;
    };

    get totalBoxCounter(){
        return this.#totalBoxCounter;
    };

    get sonBoxCounter(){
        return this.#sonBoxCounter;
    };

    // 根据坐标获取箱子
    getBox(streetIndex, houseIndex){

    };

    // 获取某个箱子的兄弟箱子
    getBrotherBox(Box){
        if(Box instanceof Box){
            var totalContainer = Box.parentBox.subContainer;
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                };
            };
            totalContainer.remove(Box);
            return totalContainer;
        }else{
            throw console.error("错误的箱子类型");
        };
    };

    // 在某个位置插入箱子
    add(parentBox, sonBox){
        parentBox.addSonBox(sonBox);
        sonBox.streetIndex = parentBox.streetIndex + 1;
        // sonBox.houseIndex = 0;
        this.#totalBoxCounter += 1;
        this.#sonBoxCounter += 1;
    };

    // 获取某个箱子的子树
    subContainer(box){
        return box.subContainer;
    };

};

var box = new Box();
console.log(box);
console.log(box.subContainer);