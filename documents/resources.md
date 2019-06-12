```
{
    // 常驻内存资源，任意场景都可以直接获取
    "persistence":{
        "pathes":[
            {
                "type":"JsonAsset",
                "path":"Persistence/Jsons"
            },
            {
                "type":"Prefab",
                "path":"Persistence/Prefabs"
            },
            {
                "type":"SpriteFrame",
                "path":"Persistence/SpriteFrames"
            }
        ]
    },

    // 场景资源 仅可在scene_name中获取到相应的资源 
    "scene_name":{
        "pathes":[
            {
                "type":"Prefab",
                "path":"scene_main/Prefabs"
            }
        ]
    }
}
```