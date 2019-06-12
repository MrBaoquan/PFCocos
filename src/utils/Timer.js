export default class Timer{

    static CountDown(InUpdateHandler,InInterval, InTimeout){
        let _interval = InInterval;
        let _timeout = InTimeout;
        return new Promise((resolve,reject)=>{
            let _timeElapsed = 0;
            let _timerID = setInterval(()=>{
                InUpdateHandler(_timeout - _timeElapsed);
                _timeElapsed+=_interval;
                if(_timeElapsed>=_timeout){
                    InUpdateHandler(0);
                    clearInterval(_timerID);
                    resolve();
                }
            }, _interval*1000.0);
        });
    }

    
    static TimeOut(InTime){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve();
            },InTime*1000.0);
        });
    }
}