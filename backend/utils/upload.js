const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

class Upload {
  constructor ({ config }) {
    this._config = config
  }

  upload (data, req, res) {
    aws.config.update({
      secretAccessKey: this._config.secretAccessKey,
      accessKeyId: this._config.accessKeyId,
      region: this._config.region
    })

    const s3 = new aws.S3()
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: this._config.bucket,
        cacheControl: 'max-age=31536000',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
          var newFileName = Date.now() + '-' + file.originalname
          cb(null, newFileName)
        }
      })
    })
    return upload.single('file')
  }
}
module.exports = Upload
