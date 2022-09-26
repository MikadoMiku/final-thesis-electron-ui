import fs from 'fs'
import { FileStats } from '../../api/api-payload-types'
import path from 'path'
import { sendMsg } from './communicator'

export async function getDataOfFiles() {
  // Should come from config that can be edited by user...
  //const testFolder = "C:/Users/power/Desktop/DEMUT_WAV_CLIPS"
  const testFolder = 'C:/Users/power/Desktop/Demut_test_file_drag'
  const files = fs.readdirSync(testFolder, 'utf8')
  let res: FileStats[] = []
  for (let file of files) {
    const extension = path.extname(file)
    const fileStats = fs.statSync(testFolder + '/' + file)
    res.push({
      name: file,
      extension,
      size: fileStats.size / 1000,
      creationTime: fileStats.birthtime.toString()
    })
  }
  sendMsg({ type: 'dataOfClipFiles', payload: res })
}
