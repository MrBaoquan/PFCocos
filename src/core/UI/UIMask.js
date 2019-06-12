import {MaskType} from "../UI/UITypes"

cc.Class({
    extends:require("ComponentUtil"),

    Apply(InMaskType){
        let _halfOpacity = 180;
        switch(InMaskType)
        {
            case MaskType.OpaqueBlock:
                    this.node.opacity = 255;
                    this.node.getComponent(cc.BlockInputEvents).enabled = true;
                break;
            case MaskType.HalfOpacityBlock:
                    this.node.opacity = _halfOpacity;
                    this.node.getComponent(cc.BlockInputEvents).enabled = true;
                break;
            case MaskType.HalfOpacityNoBlock:
                    this.node.opacity = _halfOpacity;
                    this.node.getComponent(cc.BlockInputEvents).enabled = false;
                break;
            case MaskType.TransparentBlock:
                    this.node.opacity = 0;
                    this.node.getComponent(cc.BlockInputEvents).enabled = true;
                break;
            case MaskType.TransparentNoBlock:
                    this.node.opacity = 0;
                    this.node.getComponent(cc.BlockInputEvents).enabled = false;
                break;
        }
    },

    AdjustSelfSiblingIndex(InShowingNode){
        let _siblingIndex = InShowingNode.getSiblingIndex() - 1;
        _siblingIndex = _siblingIndex>=0?_siblingIndex:0;
        this.node.setSiblingIndex(_siblingIndex);
    }
})