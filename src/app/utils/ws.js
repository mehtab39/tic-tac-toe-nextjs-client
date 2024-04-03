import Singleton from "./singleton";

const WS_URL = 'ws://localhost:5000/';

class WS extends Singleton{

    constructor(options) {
        super(options);
        this.endpoint = `game/${options.gameId}`;
        this.socket = null;
        this.reconnectAttempts = 0;
        console.log('Initialised WS')

    }

    async init(){
        return await this.connect();
    }

    async connect() {
        this.socket = new WebSocket(WS_URL + this.endpoint);

        return new Promise((resolve, reject)=>{
            this.socket.onopen = () => {
                console.log('WebSocket connection established.');
                this.reconnectAttempts = 0;
                resolve(true);
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error.message)
            };

            this.socket.onclose = () => {
                console.log('WebSocket connection closed.');
                this.scheduleReconnect();
            };

            this.socket.onmessage = (event) => {
                console.log('Received message:', event.data);
            };
        })   
    }
    scheduleReconnect() {
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff with maximum delay of 30 seconds
        setTimeout(() => {
            this.reconnectAttempts++;
            this.connect.call(this);
        }, delay);
    }

}

export default WS;
