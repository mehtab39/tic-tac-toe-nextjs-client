import { useEffect, useRef, useState } from "react";
import WS from "../utils/ws";

// realtime database
const useRTD = (url: string, sub: (msg: any) => void) => {

    const rtd = useRef<WS | null>(null);

    useEffect(() => {
        if(!url) return;
        function handleRealtimeConnection() {
            WS.getInstance(url).then((wss: WS) => {
                rtd.current = wss;
                if (sub){
                    wss.on(sub);
                }
                
            })
        }
        return handleRealtimeConnection();
    }, [url, sub])

    useEffect(()=>{
       return () => {
           if (rtd.current !== null) {
               rtd.current.socket.close()
           }
       }
    }, [])

    function publisher(payload: any) {
        if (rtd.current !== null) {
            rtd.current.send(payload);
        }

    }

    return {
        publisher
    }

}

export default useRTD;