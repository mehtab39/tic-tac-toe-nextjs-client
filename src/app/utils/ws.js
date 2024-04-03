const WS_URL = 'ws://localhost:5000/';

class WS {
    static instances = new Map();

    constructor(endpoint, onmessage) {
        this.endpoint = endpoint;
        this.socket = null;
        this.reconnectAttempts = 0;
        this.connect();
        this.onmessage = onmessage;
    }

    connect() {
        this.socket = new WebSocket(WS_URL + this.endpoint);

        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.socket.onclose = () => {
            console.log('WebSocket connection closed.');
            this.scheduleReconnect();
        };

        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
            this.onmessage.call(this, JSON.parse(event.data))
        };
    }

    scheduleReconnect() {
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000); // Exponential backoff with maximum delay of 30 seconds
        setTimeout(() => {
            this.reconnectAttempts++;
            this.connect.call(this);
        }, delay);
    }

    static async getInstance(endpoint, onmessage) {
        if (!WS.instances.has(endpoint)) {
            const instance = new WS(endpoint, onmessage);
            WS.instances.set(endpoint, instance);
        }
        return WS.instances.get(endpoint);
    }

    send(data) {
        this.socket.send(JSON.stringify(data));
    }
}

export default WS;
