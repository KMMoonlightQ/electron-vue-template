import { protocol } from 'electron'
import fs from 'fs'
import path from 'path'

const schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  stream: true
}

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: schemeConfig
  }
])

export class CustomScheme {
  private static getMimeType(extension: string) {
    let mimeType = ''

    switch (extension) {
      case '.js':
        mimeType = 'text/javascript'
        break
      case '.html':
        mimeType = 'text/html'
        break
      case '.css':
        mimeType = 'text/css'
        break
      case '.svg':
        mimeType = 'image/svg+xml'
        break
      case '.json':
        mimeType = 'application/json'
        break
      default:
        mimeType = ''
    }

    return mimeType
  }

  static registerScheme() {
    //@ts-ignore
    protocol.registerStreamProtocol('app', (request, callback) => {
      let pathName = new URL(request.url).pathname
      let extension = path.extname(pathName).toLowerCase()
      if (extension === '') {
        pathName = 'index.html'
        extension = '.html'
      }
      const tarFile = path.join(__dirname, pathName)

      callback({
        statusCode: 200,
        headers: {
          'Content-Type': this.getMimeType(extension)
        },
        data: fs.createReadStream(tarFile)
      })
    })
  }
}
