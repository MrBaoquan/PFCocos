import {UIType,MaskType} from "./UITypes"

import Managements from "../../Facade/Managements"

cc.Class({
    extends:require("ComponentUtil"),
    properties:{
        _uiType:UIType.Normal,
        UIType:{
            get:function(){return this._uiType;},
            set:function(value){this._uiType = value;}
        },

        _maskType:MaskType.HalfOpacityBlock,
        MaskType:{
            get:function(){return this._maskType;},
            set:function(value){
                this._maskType = value;
            }
        }
    },
    
    // 组件被添加时调用
    onSpawned(){
        functional.execute(this.onSetDefaultOptions.bind(this));
        Managements.UIManager.RegisterUI(this);
    },

    onLoad(){
        
    },

    onSetDefaultOptions(){
    },

    OnDisplay(){

    },

    Display(){
        this.node.active = true;
        functional.execute(this.OnDisplay.bind(this));
    },

    ReDispaly(){
        this.node.active = true;
    },

    Freeze(){
        this.node.active = true;
    },

    OnHidden(){

    },

    Hidden(){
        this.node.active = false;
        functional.execute(this.OnHidden.bind(this));
    },

    onDestroy(){
        Managements.UIManager.UnRegisterUI(this);
    },

    
    // ----------Protected Methods----------------
    notifyShow(){
        cc.log("notify show %s",this.node.name);
        Managements.UIManager.ShowUI(this.node.name);
    },

    notifyHidden(){
        
    },

    setToNormalUIType(){
        this.UIType = UIType.Normal;
    },

    setToStandaloneUIType(){
        this.UIType = UIType.Standalone;
    },

    setToPopUpUIType(){
        this.UIType = UIType.PopUp;
    },
})