cc.Class({
    extends:cc.Component,
    ctor:function(){
        this.makeSingleton();
    },

    statics:{
        Instance:null
    },
    Initialize(InInitializeCompletedHandler) 
    {
        InInitializeCompletedHandler();
    },

    onLoad(){},

    makeSingleton(){
        if(isset(this.GetInstance())){
           return;
        }
        let _className = cc.js.getClassName(this);
        cc.js.getClassByName(_className).Instance = this;
    },

    GetInstance(){
        let _className = cc.js.getClassName(this)
        return cc.js.getClassByName(_className).Instance;
    }
});