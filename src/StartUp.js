require("Bootstrap")

cc.Class({
    extends: CCSingleton,

    properties: {
        
        initializeCompletedCount:{
            default:0,
            visible:false
        }
    },
    editor:{
        executionOrder:-2000    // Ensure that all normal user-logic script execute late than this script
    },


    // Instantiate new singleton component
    attachNewManagement(InNodeName,InComponent)
    {
        let _newNode =  new cc.Node(InNodeName);
        _newNode.addComponent(InComponent);
        _newNode.parent = this.node;
        InComponent.Instance.Initialize(function(){
            if(++this.initializeCompletedCount == Object.keys(Managements).length)
            {
                this.node.children.forEach(_node=>{
                    _node.emit("onPrepared");
                });
            }
        }.bind(this));
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.main();
    },

    initializeManagements(){
        for(let _management in Managements)
        {
            this.attachNewManagement(_management,Managements[_management]);
        }        
    },
 
    main()
    {
        cc.log("qc-main start...");
        // Register all global singleton managements
        this.initializeManagements();
    }

});
