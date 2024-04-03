export default class Singleton {
    static instance = null;

    static async getInstance(options) {
        if (!this.instance) {
            this.instance = new this(options);
            if (this.instance.init) {
                await this.instance.init();
            }
        }
        return this.instance;
    }

    destroy() {
        this.instance = null;
    }
}