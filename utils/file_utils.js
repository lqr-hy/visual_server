const fs = require('fs')
//读取文件的工具方法
module.exports.getFileJsonData = filePath => {
  // 读取文件
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}
