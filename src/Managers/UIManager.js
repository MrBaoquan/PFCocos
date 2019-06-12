import Config from "../../configs/Config"
import Managements from "../Facade/Managements"
import {UIType,MaskType} from "../core/UI/UITypes"
import Stack from "../core/DataStructure/Stack"

cc.Class({
    extends: require("CCSingletonBase"),
   
    properties:{
        uis:{default:null,visible:false}
    },

    Initialize(InInitializeCompletedHandler)
    {
        this.uis = new Map();

        this.allSpawnedUICaches = new Map();
        
        // 正在显示的UI列表
        this.currentShowUIs = new Map();
        // 维护着PopUP UI的栈
        this.popupUIs = new Stack();

        InInitializeCompletedHandler();
    },


    ReTargetUIRoot(){
        this.UIRoot = cc.find("Canvas/UIRoot");
        this.NormalRoot = cc.find("NormalRoot",this.UIRoot);
        this.PopUpRoot = cc.find("PopUpRoot",this.UIRoot);
        this.ModalRoot = cc.find("ModalRoot",this.UIRoot);
    },

    // 场景被加载后调用
    ReSpawnDefaultUIS(InSceneName){
        
        this.ReTargetUIRoot();
        // 清空上一场景的UI引用链
        this.currentShowUIs.clear();
        this.allSpawnedUICaches.clear();

        let _uiConfigPath = Config.uiPath;
        cc.log(_uiConfigPath);
        let InAsset = Managements.ResourceManager.GetPersistRes(_uiConfigPath);
        let _uiConfigs = InAsset.json;
        this.uiConfigs = _uiConfigs;
        let _persitences = _uiConfigs.persistence;
        let _sceneUIs = _uiConfigs[InSceneName];
        

        // 生成PopUp蒙版
        let _uiMaskResName = _uiConfigs.common.DefaultUIMask;
        let _popUpMaskUIPrefab = Managements.ResourceManager.GetPersistRes(_uiMaskResName);
        let _popUpMaskUIGO = cc.instantiate(_popUpMaskUIPrefab);
        _popUpMaskUIGO.parent = this.PopUpRoot;
        this.popUpUIMask = _popUpMaskUIGO.addComponent("UIMask");
        let _widget = _popUpMaskUIGO.getComponent(cc.Widget);
        _widget.target = this.UIRoot.parent;
        this.popUpUIMask.Apply(MaskType.TransparentNoBlock);
        

        // 生成所有需要同步显示的UI
        this.spawnUIs(_persitences);
        if(isset(_sceneUIs)){
            this.spawnUIs(_sceneUIs);
        }
        
    },

    GetUI(InKey){
        if(this.uis.has(InKey)){
            return this.uis.get(InKey);
        }
        return null;
    },

    // 同步显示 
    ShowUI(InKey,InAction=null){
        let _uiToShow = this.allSpawnedUICaches.get(InKey);
        
        if(!isset(_uiToShow)){return;}
        let _uiType = _uiToShow.UIType;
        switch(_uiType){
            case UIType.Normal:
                this.showNormalUI(InKey);
                break;
            case UIType.Standalone:
                this.showStandaloneUI(InKey);
                break;
            case UIType.PopUp:
                this.showPopUpUI(InKey);
                break;
        }
        functional.execute1(InAction,_uiToShow);
        return _uiToShow;
    },

    HideUI(InKey){
        let _uiToShow = this.allSpawnedUICaches.get(InKey);
        if(!isset(_uiToShow)){return;}

        let _uiType = _uiToShow.UIType;
        switch(_uiType){
            case UIType.Normal:
                this.hideNormalUI(InKey);
                break;
            case UIType.Standalone:
                this.hideStandaloneUI(InKey);
                break;
            case UIType.PopUp:
                this.hidePopUpUI(InKey);
                break;
        }
    },

    // 异步显示
    ShowUIAsync(InKey){
        var that = this;
        return new Promise((resolve,reject)=>{
            let _uiPrefabPath = "UI/"+ InKey;
            Managements.ResourceManager.GetResAsync(_uiPrefabPath,cc.Prefab).then((InAsset)=>{
                let _uiInfo = that.uiConfigs.async[InKey];
                let _uiComponent = that.spawnUI(InAsset,_uiInfo);
                that.ShowUI(InKey);
                resolve(_uiComponent);
            });
        });
    },

    EmitEvent(InKey,InEventName,arg1,arg2,arg3,arg4,arg5){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        _uiComponent.node.emit(InEventName,arg1,arg2,arg3,arg4,arg5);
    },

    RegisterUI(InUI){
        let type = InUI.UIType;
        //let _key = cc.js.getClassName(InUI);
        //cc.log("register ui "+_key);
        //this.uis.set(_key,InUI);
    },

    UnRegisterUI(InUI){
        let _key = cc.js.getClassName(InUI);
        this.allSpawnedUICaches.delete(_key);
        if(this.uis.has(_key)){
            this.uis.delete(_key);
            cc.log("unregister UI :" + _key);
        }
    },

    // -------- Private methods ---------

    spawnUIs(InUIs){
        Object.keys(InUIs).forEach(_key => {
            let _uiInfo = InUIs[_key];
            let _uiPrefab = Managements.ResourceManager.GetRes(_key);
            if(!isset(_uiPrefab)){
                cc.error("can not find _uiPrefab "+ _key);
                return;
            }
            this.spawnUI(_uiPrefab,_uiInfo); 
        });
    },

    spawnUI(InUIPrefab,{scriptName}){
        let _newUINode = cc.instantiate(InUIPrefab);
        let _uiComponent = null;
        _newUINode.name = InUIPrefab.name;
        _newUINode.position = cc.Vec2.ZERO;
        _newUINode.active = false;
        let _uiComponentClass = cc.js.getClassByName(scriptName);

        if(isset(_uiComponentClass)){
            _uiComponent = _newUINode.addComponent(scriptName);
            this.allSpawnedUICaches.set(InUIPrefab.name,_uiComponent)
            functional.execute(_uiComponent.onSpawned());

            // UI初始化完成后的操作
            _newUINode.parent = this.getNodeUIAttachTo(_uiComponent.UIType);
            cc.log("add ui script %s",scriptName);
        }else{
            _newUINode.parent = this.NormalRoot;
            cc.warn("add UI script %s failed",scriptName);
        }
        return _uiComponent;
    },

    showNormalUI(InKey){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        this.currentShowUIs.set(InKey,_uiComponent);
        _uiComponent.Display();
    },

    hideNormalUI(InKey){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        _uiComponent.Hidden();
        this.currentShowUIs.delete(InKey,_uiComponent);
    },

    showStandaloneUI(InKey){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        _uiComponent.Display();
        cc.log(this.currentShowUIs);
        this.currentShowUIs.forEach((_value)=>{
           _value.Hidden(); 
        });
        this.currentShowUIs.set(InKey,_uiComponent);
    },

    hideStandaloneUI(InKey){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        this.currentShowUIs.delete(InKey);
        this.currentShowUIs.forEach((_value)=>{
            _value.Display();
        });
    },

    showPopUpUI(InKey){
        let _uiComponent = this.allSpawnedUICaches.get(InKey);
        
        _uiComponent.Display();
        this.popupUIs.Push(_uiComponent);
        this.popUpUIMask.Apply(_uiComponent.MaskType);
        this.popUpUIMask.AdjustSelfSiblingIndex(_uiComponent.node);
    },

    hidePopUpUI(InKey){
        //let _uiComponent = this.allSpawnedUICaches.get(InKey);
        let _uiComponent = this.popupUIs.Pop();
        _uiComponent.Hidden();
        let _nextPopUI = this.popupUIs.Front();
        if(!isset(_nextPopUI)){
            this.popUpUIMask.Apply(MaskType.TransparentNoBlock);
        }else{
            this.popUpUIMask.Apply(_nextPopUI.MaskType);
            this.popUpUIMask.AdjustSelfSiblingIndex(_nextPopUI.node);
        }
    },

    getNodeUIAttachTo(InUIType){
        let _node = null;
        if(InUIType==UIType.Normal||InUIType==UIType.Standalone){
            _node = this.NormalRoot;
        }else if(InUIType==UIType.PopUp){
            _node = this.PopUpRoot;
        }
        return _node;
    }
    
});