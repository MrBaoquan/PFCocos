function Queue(){
    this.dataStore = [];
    this.enqueue = enqueue;     //入队
    this.dequeue = dequeue;     //出队
    this.pop = pop;             // 弹出队首元素
    this.front = front;         //查看队首元素
    this.back = back;           //查看队尾元素
    this.toString = toString;   //显示队列所有元素
    this.clear = clear;         //清空当前队列
    this.empty = empty;         //判断当前队列是否为空
    this.length = function(){
        return this.dataStore.length;
    }
}

function enqueue ( element ) {
    this.dataStore.push( element );
}

function dequeue () {
    if( this.empty() ) return null;
    else this.dataStore.shift();
}

function empty(){
    if( this.dataStore.length == 0 ) return true;
    else return false;
}

function pop(){
    if( this.empty() ) return null;
    else return this.dataStore.shift(); 
}

function front(){
    if( this.empty() ) return null;
    else return this.dataStore[0];
}

function back () {
    if( this.empty() ) return null;
    else return this.dataStore[ this.dataStore.length - 1 ];
}

function toString(){
    return this.dataStore.join('\n');
}

function clear(){
    delete this.dataStore;
    this.dataStor = [];
}

module.exports = Queue;