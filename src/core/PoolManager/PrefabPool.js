cc.Class({
    Initialize(InPrefab,InCount){
        this.pool = new cc.NodePool();
        this.nodePrefab = InPrefab;

        for(let _index=0;_index<InCount;++_index){
            let _node = cc.instantiate(this.nodePrefab);
            this.pool.put(_node);
        }
    },

    GetNewOne(InParentNode) {
        let _node = null;
        if (this.pool.size() > 0) { 
            _node = this.pool.get();
        } else {
            _node = cc.instantiate(this.nodePrefab);
        }
        _node.parent = InParentNode;
        _node.position = cc.Vec3.ZERO;
        return _node;
    },

    Recycle(InOldNode){
        this.pool.put(InOldNode);
    },

    Clear(){
        this.pool.clear();
    }
})