import Singleton from '../singleton';
export default class GameRTD extends Singleton{
    options: any;
    rtd = null;
    constructor(options: any){
        super()
        this.options = options;
    }

    subscribe(fn: (msg: string) => void){
        throw new Error('Not implemented')
    }

    write(message: string){
        throw new Error('Not implemented')
    }

    unsubscribe(){
        throw new Error('Not implemented')
    }
}

