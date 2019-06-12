import Managements from "../Facade/Managements"

cc.Class({
    extends: require("CCSingletonBase"),

    Initialize(InInitializeCompletedHandler)
    {
        this.sceneScripts = new Map();
        InInitializeCompletedHandler();
    },

    onLoad () {
        this._super();
    },

    start () 
    {
        
    },


    preloadScene(InSceneName,InPreloadCompletedHandler)
    {
        cc.director.preloadScene(InSceneName,InPreloadCompletedHandler);
    },

    // 场景脚本 在开始加载场景时执行
    PreloadSceneEntryScript(InSceneName){
        let _sceneScriptClass =  require(InSceneName+"_Entry");
        // 场景脚本预加载操作是否完成
        _sceneScriptClass.onPreloaded = false;
        if(isset(_sceneScriptClass)){
            let _sceneScript = new _sceneScriptClass();
            _sceneScript.preload(()=>{
                _sceneScript.onPreloaded = true;
            });
            this.sceneScripts.set(InSceneName,_sceneScript);
        }
    },

    TrueIfSceneEntryScriptReady(InSceneName){
        if(!this.sceneScripts.has(InSceneName)){return true;}
        return this.sceneScripts.get(InSceneName).onPreloaded;
    },

    LoadSceneEntryScript(InSceneName){
        Managements.UIManager.ReSpawnDefaultUIS(InSceneName);
        if(this.sceneScripts.has(InSceneName))
        {
            functional.execute(this.sceneScripts.get(InSceneName).start);
        }
    },

    UnloadSceneEntryScript(InSceneName){
        if(this.sceneScripts.has(InSceneName))
        {
            functional.execute(this.sceneScripts.get(InSceneName).destroy);
        }
    },

    // 加载场景
    LoadScene(InSceneName,InOnProgressHandler,InOnLoadedHandler){
        var that = this;
        this.PreloadSceneEntryScript(InSceneName);
        let _sceneNameToBeUnload = cc.director.getScene().name;
        Managements.ResourceManager.LoadSceneDynamicRes(InSceneName,()=>{ // 加载场景动态资源
            cc.director.preloadScene(InSceneName,InOnProgressHandler,()=>   // 预加载场景
            {
                Managements.ResourceManager.UnloadSceneDynamicRes(_sceneNameToBeUnload);  // 卸载上一场景动态资源
                that.UnloadSceneEntryScript(_sceneNameToBeUnload);
                // cc.director.loadScene(InSceneName,()=>
                // {
                //     that.LoadSceneEntryScript(InSceneName);
                //     functional.execute(InOnLoadedHandler);
                // });
                // return;
                let _queryEnterScene = ()=>{
                    if(that.TrueIfSceneEntryScriptReady(InSceneName)){
                        that.unschedule(_queryEnterScene);
                        cc.director.loadScene(InSceneName,()=>
                        {
                            that.LoadSceneEntryScript(InSceneName);
                            functional.execute(InOnLoadedHandler);
                        });
                    }
                }
                that.schedule(_queryEnterScene,0.0333);
            });
        });    
    },

});
