import WsRTD from './WsRTD'
import SseRTd from './SseRTd'
import { featureConfigs } from '../../configs/game' 
export default class RTDServices {
    static getService(params) {
        if (featureConfigs.use_sse){
            return SseRTd;
        }
        return WsRTD;
    } 
}