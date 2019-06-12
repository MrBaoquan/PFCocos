const Normal="Normal",Standalone="Standalone",PopUp="PopUp";

export class UIType{
    static get Normal(){
        return Normal;
    }
    static get Standalone(){
        return Standalone;
    }

    static get PopUp(){
        return PopUp;
    }
}

const OpaqueBlock="OpaqueBlock",HalfOpacityBlock="Opacity50Block",HalfOpacityNoBlock="Opacity50NoBlock",TransparentBlock="TransparentBlock",TransparentNoBlock="TransparentNoBlock";

export class MaskType{
    static get OpaqueBlock(){
        return OpaqueBlock;
    }
    static get HalfOpacityBlock(){
        return HalfOpacityBlock;
    }

    static get HalfOpacityNoBlock(){
        return HalfOpacityNoBlock;
    }

    static get TransparentBlock(){
        return TransparentBlock;
    }

    static get TransparentNoBlock(){
        return TransparentNoBlock;
    }
}