import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function saveSchedule(input) {
  socket.emit('saveSchedule', input);
}

export function getSchedule(input) {
  socket.emit('getSchedule', input);
}

export function receiveSchedule(cb) {
  socket.on('getSchedule', data => cb(null, data));
}