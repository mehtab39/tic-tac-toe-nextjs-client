const WS_URL = 'ws://localhost:5000/';

class WS {
    static instances = new Map();

    constructor(enpoint) {
        this.enpoint = enpoint;
        this.socket = new WebSocket(WS_URL + enpoint);
        
        this.init = new Promise((resolve) => {
            this.socket.onopen = function () {
                console.log('WebSocket connection established.');
                resolve(true);
            };

            this.socket.onerror = function (error) {
                console.error('WebSocket error:', error);
            };

            this.socket.onclose = function () {
                console.log('WebSocket connection closed.');
            };
        });
    }

    on(fn) {
        this.socket.onmessage = (event) => {
              fn(JSON.parse(event.data))
        };
    }

    static async getInstance(endpoint) {
        if (!WS.instances.has(endpoint)) {
            const instance = new WS(endpoint);
            await instance.init;
            WS.instances.set(endpoint, instance);
        }
        return WS.instances.get(endpoint);
    }

    send(data) {
        this.socket.send(JSON.stringify(data));
    }
}

export default WS;
