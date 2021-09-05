const WebSocket = require('ws');
const Path = require('path')
const fileUtils  = require('../utils/file_utils')
// 创建websocket 服务器的对象，绑定端口9998
const wss = new WebSocket.Server({
  port: 9998
});

module.exports.listen = () => {
  // 对客户端的连接时间进行监听
  // client： 表示客户端连接的socket对象
  wss.on('connection', client => {
    console.log('客户端已连接');
    // 对客户端的连接对象f进行message时间监听
    // msg: 由客户端给服务端发送数据
    client.on('message', async msg => {
      // console.log('客户端发送数据给服务端了' + msg);
      const payload = JSON.parse(msg)

      // 取出 action 字段
      const action = payload.action

      // 判断是不是获取数据的
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        filePath = Path.join(__dirname, filePath)

        const ret = await fileUtils.getFileJsonData(filePath)
        payload.data = ret
        // 将最新数据发送给客户端
        client.send(JSON.stringify(payload))
      } else {
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }

      // 有服务端响客户端发送数据
      // client.send('hello 我是后端数据');
    });
  });
};
