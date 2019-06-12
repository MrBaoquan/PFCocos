import Axios from "../core/Network/Axios";
export default class Http
{
    static Request({url,type,data,header,success,failed}){
        let _type = isset(type)?type:"GET";
        let _data = isset(data)?data:"";
        if(_type.toLowerCase()=="get")
        {
            Axios.Get(url,header).then(success,failed);
        }else if(_type.toLowerCase()=="post")
        {
            Axios.Post(url,_data,header).then(success,failed);
        }
    }

    static Task({url,type,data,header})
    {
        let _type = isset(type)?type:"GET";
        let _data = isset(data)?data:"";
        if(_type.toLowerCase()=="get")
        {
            return Axios.Get(url,header);
        }else if(_type.toLowerCase()=="post")
        {
            return Axios.Post(url,_data,header);
        }
    }

    static All(InTasks,InHandler){
        Axios.All(InTasks,InHandler);
    }
}