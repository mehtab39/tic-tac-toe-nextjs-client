import WS from "../ws";
import GameRTD from "./base";

class WsRTD extends GameRTD{
    constructor(options){
        super(options);
        console.log('Initialised web socket RTD')
    }
    async init(){
        const wss = await WS.getInstance(this.options);
        this.rtd = wss;
    }

    subscribe(fn) {
        this.rtd.socket.onmessage = (event) => {
            fn(JSON.parse(event.data));
        }
    }
    publish(message) {
        this.rtd.socket.send(JSON.stringify(message));
    }

    unsubscribe(){
        this.rtd.socket.close()
    }
}

export default WsRTD;