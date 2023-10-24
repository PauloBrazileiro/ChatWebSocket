const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const cors = require('cors');

let clientContent = {
    content:{
        id:'',
        name:'',
        message:''
    }
}

const io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

app.use(express.static(path.join(__dirname, '/')));

app.listen(3000,()=>{
    console.log('Configurando server Express...')
})
io.listen(5000)

io.on('connection', (socket)=>{
    console.log('conectado')
    socket.on('chat msg',(data)=>{
        clientContent.content.id = socket.id
        clientContent.content.name = data.content.name
        clientContent.content.message = data.content.message

        io.emit('chat msg', clientContent)
    })

    socket.on('in chat', (data)=>{
        inChat = {name:data, id:socket.id}
        io.emit('in chat', inChat)
    })

})

io.on('disconnect', (data)=>{
    console.log('desconectado')
})

