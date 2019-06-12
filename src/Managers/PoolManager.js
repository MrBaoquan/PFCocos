cc.Class({
    extends:require("CCSingletonBase"),

    onLoad(){
        this.Pools = new Map();
    },

    
    GetPool(InPoolName){
        return this.Pools.get(InPoolName);
    },


    AddPool(InKey,InSpawnPool){
        this.Pools.set(InKey,InSpawnPool);
    },
});