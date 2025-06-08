let socket: WebSocket;

export const connectWebSocket = (onMessage: (data: any) => void) => {
  socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET}`);

  socket.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    onMessage(parsed);
  };
};

export const sendFormUpdate = (data: any) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: "update", data }));
  }
};
