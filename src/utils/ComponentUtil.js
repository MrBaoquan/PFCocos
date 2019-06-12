cc.Class({
    extends:cc.Component,

    Get(InPath,InComponent){
        return cc.find(InPath,this.node).getComponent(InComponent);
    },

    SendMessage(InNode,InEventName,arg1,arg2,arg3,arg4,arg5){
       InNode.emit(InEventName,arg1,arg2,arg3,arg4,arg5);
    },

    BindButtonClickedEvent(InButton,InCallback,arg1,arg2,arg3){
        InButton.node.on("click",function(InEvent){
            InCallback(InEvent,arg1,arg2,arg3);
        });
    }
});