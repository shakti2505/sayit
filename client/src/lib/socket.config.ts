import {io, Socket} from 'socket.io-client';

let socket:Socket

export const getSocket = ():Socket => {
    if(!socket){
        // connecting to the server and autoconnect is false means it will only connect when we want it to.
        socket=io(import.meta.env.VITE_BACKEND_URL, {autoConnect:false});   
    }
    return socket;
}