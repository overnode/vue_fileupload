import * as express from 'express'
import * as expressFileUpload from 'express-fileupload'
import * as cors from 'cors'
import { generateSHA1Hash, getFileExtension } from './utils'

const PORT = process.env.PORT || 3000
const PUBLIC_DIR = process.env.PUBLIC_DIR || 'public'

const app = express()

const corsOptions: cors.CorsOptions = {
  origin: ['http://localhost', 'http://localhost:8080']
}

app.use(express.static(__dirname + '/' + PUBLIC_DIR))
app.use(cors(corsOptions))
app.use(expressFileUpload())

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(500).send('No files submitted!')
  }

  let theFile = req.files.file as expressFileUpload.UploadedFile

  const fileExt = getFileExtension(theFile.name)
  const newFilename = generateSHA1Hash(theFile.data) + '.' + fileExt

  var baseUrl = req.protocol + '://' + req.get('host')

  theFile.mv(`${__dirname}/${PUBLIC_DIR}/${newFilename}`, err => {
    if (err) {
      console.log(err)
      res.status(500).send('Error saving file!')
    }

    res.send({ name: newFilename, path: `${baseUrl}/${newFilename}` })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
