import Config  from "../../configs/Config";

cc.Class({
    extends: require("CCSingletonBase"),

    properties: {
        assetMaps:{
            default:null,
            visible:false
        },

        // This object will be maped with a json data in resource-config file.
        configs:{
            default:null,
            visible:false
        }
    },

    // will be called before onLoad within this script
    Initialize(InInitializeCompletedHandler)
    {
        this.assetMaps = new Map();
        this.resConfigPath = Config.resPath;
        this.uiConfigPath = Config.uiPath;
        // Load resource config file.
        cc.loader.loadRes(this.resConfigPath,cc.JsonAsset,(InError,InJsonAsset)=>{
            if(InError){
                cc.error("can not load resource config file: "+ InError);
                return;
            }
            this.configs = InJsonAsset.json;
            for(let _key in this.configs){
                this.assetMaps.set(_key,new Map());
            }

            // Initialize basic resources...
            this.loadResDirByKeyAsync("persistence",function(){
                this.loadResDirByKeyAsync(cc.director.getScene().name,InInitializeCompletedHandler);
            }.bind(this));
        });
    },
    
    GetSceneRes(InAssetName){
        let _sceneName = cc.director.getScene().name;
        let _sceneAsset = this.assetMaps.get(_sceneName);
        if(!isset(_sceneAsset)){return null;}

        return this.assetMaps.get(_sceneName).get(InAssetName);
    },

    GetPersistRes(InAssetName){
        return this.assetMaps.get("persistence").get(InAssetName);
    },

    GetRes(InAssetName){
        let _asset = this.GetPersistRes(InAssetName);
        if(isset(_asset)){
            return _asset;
        }
        
        _asset = this.GetSceneRes(InAssetName);
        if(isset(_asset)){
            return _asset;
        }
        return null;
    },

    GetResAsync(path,type){
        var that = this;
        type = isset(type)?type:null;
        
        return new Promise((resolve,reject)=>{
            let _sceneName = cc.director.getScene().name;
            let _resPath = Config.asyncResPath+"/"+path;
            cc.log(_resPath);
            cc.loader.loadRes(_resPath,type,(InError,InAsset)=>{
                that.assetMaps.get(_sceneName).set(InAsset.name,InAsset);
                resolve(InAsset);
            });
        });  
    },


    onLoad () {
        this._super();
    },

    start () {
        
    },


    LoadSceneDynamicRes(InSceneName,InLoadCompleteHandler=null){
        this.loadResDirByKeyAsync(InSceneName,()=>{
            InLoadCompleteHandler();
        });
    },

    // TODO 资源卸载相关
    UnloadSceneDynamicRes(InSceneName){
       // this.unloadResDirByKey(InSceneName);
    },

    loadResDirByKeyAsync(InKeyName,InLoadCompleteHandler=null) {
        let _pathes = this.configs[InKeyName].pathes;
        if(_pathes.length <= 0){
            if(InLoadCompleteHandler)   InLoadCompleteHandler();
            return;
        }

        let _pathIndex = 0;
        // loaded assets
        let _loadResDirHandler = function (InError, InAsset) {
            InAsset.forEach(_asset => {
                this.assetMaps.get(InKeyName).set(_asset.name, _asset);
                //cc.log(_asset);
            })
           // cc.log(_pathes[_pathIndex-1].path);
            if (_pathIndex < _pathes.length) {
                loadResDir(_pathIndex++);
            } else {
                if(InLoadCompleteHandler)   InLoadCompleteHandler();
            }
        }

        let loadResDir = function (InPathIndex) {
            let _path = _pathes[InPathIndex];
            cc.log(_path.path);
            let _resType = isset(_path.type)?_path.type:null;
            if(!_resType || _resType=="default")
            {
                cc.loader.loadResDir(_path.path, _loadResDirHandler.bind(this));
            }else{
                cc.loader.loadResDir(_path.path, cc[_resType], _loadResDirHandler.bind(this));
            }
            
        }.bind(this)

        loadResDir(_pathIndex++);
    },

    unloadResDirByKey(InKeyName){
        let _pathes = this.configs[InKeyName].pathes;
        _pathes.forEach(_path => {
            cc.loader.releaseResDir(_path);
        });
        this.assetMaps.get(InKeyName).clear();
    },

});
