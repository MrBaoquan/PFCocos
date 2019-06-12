import Config from "../../../configs/Config";

export default class Axios{
    static BaseUrl(){
        return Config.httpServerBaseUrl;
    }

    static RealtiveUrl(InParam)
    {
        return Axios.BaseUrl()+"/"+InParam;
    }


    static SetBaseUrl(InValue){
        //axios.defaults.baseURL = InValue;
    }

    static Get(url)
    {
        url = Axios.assembleUrl(url);
        return axios.get(url);
        // return new Promise((resolve,reject)=>{
        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //             var response = xhr.responseText;
        //             resolve(response);
        //         }
        //     };
        //     xhr.open("GET", Axios.assembleUrl(url), true);
        //     xhr.send();
        // })
    }

    static Post(url,data,header=null){
        return axios.post(Axios.assembleUrl(url),data,{header});
        // return new Promise((resolve,reject)=>{
        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //             var response = xhr.responseText;
        //             resolve(response);
        //         }
        //     };
        //     xhr.open("POST", Axios.assembleUrl(url), true);
        //     xhr.send(JSON.stringify(data)); 
        // })
    }

    static All(InRequestArray,InHandler){
        axios.all(InRequestArray).then(axios.spread(InHandler));
    }

    static trueIfAbsoluteUrl(InUrl)
    {
        return InUrl.startsWith("https://")||InUrl.startsWith("http://");
    }

    static assembleUrl(InUrl){
        let _url = InUrl;
        if(!Axios.trueIfAbsoluteUrl(InUrl)){
            _url = Axios.RealtiveUrl(InUrl);
        }
        return _url;
    }
}

