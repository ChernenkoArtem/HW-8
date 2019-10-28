function ListInterface () {}

ListInterface.prototype.push = function () {};
ListInterface.prototype.pop = function () {};
ListInterface.prototype.unshift = function() {};
ListInterface.prototype.shift = function() {};
ListInterface.prototype.sort = function () {};
ListInterface.prototype.size = function () {};
ListInterface.prototype.toString = function () {};
ListInterface.prototype.clearList = function () {};

const aList = new AList();
function AList() {
    this.collection = [];
    this.length = 0;
}

AList.prototype.clearList = function(){
    this.collection = [];
    this.length = 0;
};

AList.prototype.size = function () {
    if(arguments.length > 0) return false;
    return this.length;
};

AList.prototype.push = function (el) {
    if(arguments.length > 1 || arguments.length < 1) return false;
    this.collection[this.length] = el;
    this.length++;
};


AList.prototype.pop = function () {
    if(arguments.length > 0 || this.size() < 1) return false;
    tmpArr = [];
    let lastValue = this.collection[this.size() - 1];
    for (let i = 0; i < this.size()-1; i++){
        tmpArr[i] = this.collection[i];
    }
    this.collection = tmpArr;
    this.length--;
    return lastValue;
};

AList.prototype.unshift = function (el) {
    if(arguments.length > 1 || arguments.length < 1) return false;
    tmpArr = [];
    for (i = this.size()-1; 0 <=i; i--){
        tmpArr[i+1] = this.collection[i];
    }
    this.collection = tmpArr;
    tmpArr[0] = el;
    this.length++;
};

AList.prototype.shift = function () {
    if (arguments.length > 0 || this.size() < 1) return false;
    let tmpArr = [];
    for (let i = 1; i < this.size();i++){
        tmpArr[i-1] = this.collection[i];
    }
    this.collection = tmpArr;
    this.length--;
};

AList.prototype.toString = function () {
    tmpString = '';
    for (let i = 0; i< this.size();i++){
        if ( i == this.size()-1){
            tmpString += this.collection[i];
            break;
        }
        tmpString += this.collection[i] + ',';
    }
    return tmpString;
};

AList.prototype.sort = function (compare) {
    if (compare){
        if (typeof compare == "function"){
            let temp;
            for (let i = 0; i < this.size();i++){
                for (let j = 0; j < this.size();j++) {
                    if (compare(this.collection[j] , this.collection[i]) > 0) {
                        temp = this.collection[i];
                        this.collection[i] = this.collection[j];
                        this.collection[j] = temp;
                    }
                }
            }
        }
        else {
            return false;
        }
    }
    else{
        for (let i = 0; i < this.size();i++) {
            for (let j = 0; j < this.size(); j++) {
                if (String(this.collection[j]) > String(this.collection[i])) {
                    let temp = this.collection[i];
                    this.collection[i] = this.collection[j];
                    this.collection[j] = temp;
                }
            }
        }
    }
};

AList.prototype.toLinkedList = function () {
    if (arguments.length > 0 || this.size() < 1) return false;
    let tmpLinked = {
        root : {
            head : null,
            tail : null,
        }
    };
    function createTmpNode(el) {
        return {
            el : el ? el : null,
            prev : null,
            next : null,
        };
    };
    for (let i=0; i < this.size();i++){
        let Node = createTmpNode(this.collection[i]);
        if(tmpLinked.root.head == null && tmpLinked.root.tail == null) {
            tmpLinked.root.tail = Node;
            tmpLinked.root.head = Node;
        }else{
            Node.prev = tmpLinked.root.tail ;
            tmpLinked.root.tail.next = Node;
            tmpLinked.root.tail = Node;
            Node.next = tmpLinked.root;
        }
    }
    return tmpLinked;
};

function superAList() {
    AList.apply(this, arguments)
};

superAList.prototype = Object.create(AList.prototype);
superAList.prototype.constructor = superAList;

const SAList = new superAList();

superAList.prototype.map = function (callback) {
    const resultArray = [];
    for (let i = 0; i < this.length; i++) {
        resultArray.push(callback(this.collection[i], i, this.collection));
    }
    return resultArray;
};

superAList.prototype.reduce = function(callback, initialVal) {
    const accumulator = (initialVal === undefined) ? undefined : initialVal;
    for (var i = 0; i < this.length; i++) {
        if (accumulator !== undefined)
            accumulator = callback.call(undefined, accumulator, this.collection[i], i, this.collection);
        else
            accumulator = this[i];
    }
    return accumulator;
};

/*----------Linked List---------*/
const lList = new LList();
function LList() {
    this.root = {
        head : null,
        tail : null,
        length :0,
    };
}

LList.prototype.clearList = function(){
    this.root = {
        head : null,
        tail : null,
        length : 0,
    }
};

LList.prototype.createNode = function (el) {
    return {
        el: el ? el : null,
        prev: null,
        next: null,
    };
};

LList.prototype.size = function () {
    if (arguments.length > 0 ) return false;
    return this.root.length;
};

LList.prototype.push = function (el) {
    if ( arguments.length < 1 || arguments.length > 1 ) return false;
    let newNode = this.createNode(el);
    if(this.root.head == null && this.root.tail == null) {
        this.root.head = newNode;
        this.root.tail = newNode;
    }else{
        newNode.prev = this.root.tail;
        this.root.tail.next = newNode;

        this.root.tail = newNode;

        newNode.next = this.root;
    }
    this.root.length++;
};

LList.prototype.pop = function () {
    if( arguments.length > 0 || this.size() < 1) return false;
    this.root.tail.prev.next = this.root;
    this.root.tail = this.root.tail.prev;
    this.root.length--;
};

LList.prototype.unshift = function (el) {
    if (arguments.length < 1 || arguments.length > 1 ) return false;
    let newNode = this.createNode(el);
    if(this.root.head == null && this.root.tail == null) {
        this.root.tail = newNode;
        this.root.head = newNode;
    }else{
        newNode.prev = this.root;
        this.root.head.prev = newNode;
        newNode.next = this.root.head;
        this.root.head = newNode;
    }
    this.root.length++;
};

LList.prototype.shift = function () {
    if( arguments.length > 0 || this.size() < 1) return false;
    this.root.head.next.prev = this.root;
    this.root.head = this.root.head.next;
    this.root.length--;
};

LList.prototype.toString = function () {
    if(arguments.length > 0) return false;
    let tmpString = '';
    let tmpNode = this.root.head;
    while(tmpNode.next !== this.root){
        tmpString += tmpNode.el + ',';
        tmpNode = tmpNode.next;
    }
    tmpString += tmpNode.el + ',';
    tmpString = tmpString.substring(0, tmpString.length - 1);

    return tmpString
};

LList.prototype.toAList = function () {
    if( arguments.length > 0 || this.size() < 1) return false;
    let tmpArr = [];
    let tmpNode = this.root.head;
    let i = 0;
    while (tmpNode.next !== this.root){
        tmpArr[i]= tmpNode.el;
        i++;
        tmpNode = tmpNode.next;
    }
    tmpArr[i]= tmpNode.el;
    return tmpArr;
};

LList.prototype.sort = function (compare) {
    if (compare){
        if (typeof compare == "function"){
            let temp;
            for (let i = 0; i < this.root.length;i++){
                let Node = this.root.head;
                for (let j = 0; j < this.root.length;j++) {
                    if (compare( Node.el , Node.next.el) > 0) {
                        temp = Node.el ;
                        Node.el  = Node.next.el;
                        Node.next.el = temp;
                    }
                    Node = Node.next;
                }
            }
        }
        else {
            return false
        }
    }
    else{
        for (let i = 0; i < this.root.length;i++) {
            let Node = this.root.head;
            for (let j = 0; j < this.root.length; j++) {
                if (String(Node.el) > String(Node.next.el)) {
                    let temp = Node.el;
                    Node.el = Node.next.el;
                    Node.next.el = temp;
                }
                Node = Node.next;
            }
        }
    }
};
