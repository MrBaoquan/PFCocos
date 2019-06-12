 /*
 * File: GameController.js
 * Created At: 2019-05-14 10:51:58
 * Author: MrBaoquan (mrma617@gmail.com)
 * Copyright 2019, 安徽玩美信息科技有限公司
 * Description: Entry point of business logic 
 */
 import Managements from "../Facade/Managements"

 cc.Class({
    extends: require("CCSingletonBase"),
    
    Initialize(InInitializeCompletedHandler) 
    {   
        this.node.on("onPrepared",this.LogicMain.bind(this));
        let _startSceneName = cc.director.getScene().name;
        Managements.SceneManager.PreloadSceneEntryScript(_startSceneName);
        InInitializeCompletedHandler();
    },

    // 程序启动后 quick-cocos 初始化工作准备就绪时调用  程序的逻辑入口
    LogicMain()
    {
        let _startSceneName = cc.director.getScene().name;
        Managements.SceneManager.LoadSceneEntryScript(_startSceneName);
    },


    onLoad()
    {
        this._super();
    }
});
