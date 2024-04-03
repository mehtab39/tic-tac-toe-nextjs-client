import WsRTD from './WsRTD'
import SseRTd from './SseRTd'

const is_sse_enabled = true;
export default class RTDServices {
    static service = is_sse_enabled ? SseRTd : WsRTD;
}