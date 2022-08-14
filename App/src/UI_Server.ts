import express from 'express'
import path from 'path'
import * as pjson from '../package.json'
import * as WebSocket from 'ws'
import { handleMessage } from './communicator'

export let _ws

export const setupUIServer = (): void => {
  const server = express()
  let uiPath
  // let assetsPath
  if (process.env.NODE_ENV !== 'development') {
    uiPath = path.join(path.dirname(process.execPath), '\\public')
/*     assetsPath = path.join(
      process.env.ProgramData,
      '\\Nixor\\',
      pjson.build.productName
    )  */
    // Windows specific!
  } else {
    // TODO: local paths
    uiPath = path.join(process.cwd(), '..\\UI\\dist')
    // assetsPath = path.join(process.cwd(), '..\\pd')
  }

  console.log('path', uiPath)
  server.use(express.static(uiPath))
  // server.use('/pd', express.static(assetsPath))
  //heheheh

  var wsServer = server.listen(58008, function () {
    console.log('server started')
  })

  const wss = new WebSocket.Server({ server: wsServer })
  wss.on('connection', function connection(ws) {
    _ws = ws
    ws.on('message', function incoming(message) {
      handleMessage(message)
    })
  })
}