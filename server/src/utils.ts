import * as crypto from 'crypto'

const generateSHA1Hash = (data: crypto.BinaryLike) => {
  return crypto
    .createHash('sha1')
    .update(data)
    .digest('hex')
}

const getFileExtension = (filename: string) => {
  const nameSplited = filename.split('.')
  return nameSplited[nameSplited.length - 1]
}

export { generateSHA1Hash, getFileExtension }
