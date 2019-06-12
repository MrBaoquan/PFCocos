let PrefabPool = require("PrefabPool")

cc.Class({
    extends:cc.Component,

    properties:{
        poolName:"PoolName",
        perPrefabs:[cc.Prefab],
        _prefabs:{default:null,visible:false},
        Prefabs:{
            get:function(){
                return this._prefabs;
            },
            visible:false
        },
        cacheCount:10,
        _pools:null
    },

    onLoad(){
        this._pools = new Map();
        this._prefabs = new Map();
        this.UpdatePool();
        Managements.PoolManager.Instance.AddPool(this.poolName,this);
    },

    GetPrefab(InPrefabName){
        if(this.Prefabs.has(InPrefabName)){
            return this.Prefabs.get(InPrefabName);
        }
        return null;
    },

    GetNewOne(InPrefab,InParentNode){
        if(!isset(InPrefab)){return null;}
        return this._pools.get(InPrefab.name).GetNewOne(InParentNode);
    },

    GetNewOneByName(InPrefabName,InParentNode){
        let _prefab = this.GetPrefab(InPrefabName);
        return this.GetNewOne(_prefab,InParentNode);
    },

    UpdatePool(){
        this.perPrefabs.forEach(_prefab => {
            if(!isset(_prefab)){
                return;
            }
            this._prefabs.set(_prefab.name,_prefab);
            this._pools.set(_prefab.name,this.createPrefabPool(_prefab));
        });
    },

    Recycle(InPrefab){
        return this._pools.get(InPrefab.name).Recycle(InPrefab);
    },

    createPrefabPool(InPrefab){
        let _prefabPool = new PrefabPool();
        _prefabPool.Initialize(InPrefab,this.cacheCount);
        return _prefabPool;
    },

    onDestroy(){
        // TODO clear pool
    }

})