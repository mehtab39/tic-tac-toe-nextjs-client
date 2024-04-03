import { BASE_URL, axiosInstance } from "../axiosInstance";
import GameRTD from "./base";

function getEndpoint(gameId, activity){
    return `/game/${activity}/${gameId}`
}
class SseRTD extends GameRTD {
    constructor(options) {
        super(options);
        this.rtd = new EventSource(BASE_URL + getEndpoint(options.gameId, 'observe'));
        console.log('Initialised SSE RTD')
    }

    async init(){
        return new Promise((resolve)=>{
            this.rtd.addEventListener('open', resolve)
        })   
    }
    subscribe(fn) {
        if (this.rtd.readyState === 1){
            console.log('ADDING SUBSCRIPTION', this.rtd)
            this.rtd.onmessage = function (event) {
                console.log('Received SSE data', event.data)
                fn(JSON.parse(event.data));
            };
        }
      
    }
    unsubscribe(){
        this.rtd.close(); 
    }
    publish(message) {
        try {
            axiosInstance.post(getEndpoint(this.options.gameId, 'play'), message);
        } catch (error) {
            console.error('Error creating game:', error);
        }
    }
}

export default SseRTD;

