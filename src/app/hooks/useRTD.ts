import { useEffect, useRef, useState } from "react";
import WS from "../utils/ws";

// realtime database
const useRTD = (url: string, sub: (msg: any) => void) => {

    const rtd = useRef<WS | null>(null);

    useEffect(() => {
        if(!url) return;
        function handleRealtimeConnection() {
            WS.getInstance(url, sub).then((wss: WS) => {
                rtd.current = wss;    
            })
        }
        return handleRealtimeConnection();
    }, [url, sub])

    useEffect(()=>{
       return () => {
           if (rtd.current !== null) {
               rtd.current.socket!.close()
           }
       }
    }, [])

    function publish(payload: any) {
        if (rtd.current !== null) {
            rtd.current.send(payload);
        }

    }

    return {
        publish
    }

}

export default useRTD;