/*
 * File: Bootstrap.js
 * Created At: 2019-05-13 14:33:11
 * Author: MrBaoquan (mrma617@gmail.com)
 * Copyright 2019, 安徽玩美信息科技有限公司
 * Description: Initailize all global variables
 */

require("functions")
require("Globals")

window.QCInitialize = ()=>{
    window.Queue = require("Queue");
    window.CCSingleton = require("CCSingletonBase")
    window.Managements =
    {
        SceneManager:require("SceneManager"),
        ResourceManager:require("ResourceManager"),
        PoolManager:require("PoolManager"),
        UIManager:require("UIManager"),
        
        // Add your custom singleton module below this line
        GameController:require("GameController")
    }
}

window.QCInitialize();
