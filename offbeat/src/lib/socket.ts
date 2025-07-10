import { io } from 'socket.io-client';

const socket = io("http://localhost:4000");//handle backend url
export default socket;