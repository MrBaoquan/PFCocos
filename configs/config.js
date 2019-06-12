import Axios from "../src/core/Network/Axios";

export default class Config{
    // 资源配置文件目录 相对于 resources 文件夹
    static resPath = "resources";   // resources.json 
    
    //  ui 相关配置文件名
    static uiPath = "ui";           // ui.json

    // 需要异步加载的资源
    static asyncResPath = "Async";

    // http请求默认基本路径
    static httpServerBaseUrl = "http://localhost";

    static set HttpServerBaseUrl(value){
        Config.httpServerBaseUrl = value;
        Axios.SetBaseUrl(value);
    }
    
}