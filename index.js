const net = require('net');

const PORT = 8087
const HOST = 'localhost'

const clientHandler = socket => {
    socket.on('connection', sk => {
        console.log('connection');
    })

    socket.on('data', data => {
        console.log(data.toString());
        send({path:'test'}, socket)
    })

    socket.on('close', () => {
        console.log('close');
    })

    socket.on('error', error => {
        console.log('error');
    })
}

const send = (data,socket) => {
    console.log(JSON.stringify(data));
    let a =  Buffer.from(JSON.stringify(data))
    const buf1 = Buffer.alloc(4 + a.length);
    buf1[0] = a.length
    console.log(buf1[0])
    buf1.write(JSON.stringify(data),4,a.length)
    socket.write(buf1)
}

const app = net.createServer(clientHandler)

app.listen(PORT, HOST, () => {
    console.log('启动',PORT);
})