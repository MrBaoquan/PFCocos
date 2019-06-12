let functional = {};
functional.execute = function(InFunc){
    if(typeof(InFunc) === "function"){
        InFunc();
    }
}

functional.execute1 = function(InFunc,InParam1){
    if(typeof(InFunc) === "function"){
        InFunc(InParam1);
    }
}

functional.execute2 = function(InFunc,InParam1,InParam2){
    if(typeof(InFunc) === "function"){
        InFunc(InParam1,InParam2);
    }
}

functional.execute3 = function(InFunc,InParam1,InParam2,InParam3){
    if(typeof(InFunc) === "function"){
        InFunc(InParam1,InParam2,InParam3);
    }
}

window.functional = functional;

window.isset = function(InVariable){
    return !(typeof(InVariable)=="undefined") && InVariable!=null;
};


/**
 *  return a random int value between [InLower,InUpper]
 */
window.randomInt = function(InLower,InUpper){
    return Math.floor(Math.random() * (InUpper - InLower+1)) + InLower;
}

window.config = function(InModuleName,InKey){
    return require(InModuleName)[InKey];
}