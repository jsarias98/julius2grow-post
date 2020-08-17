const config = {
  PORT: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI
  },
  auth: {
    secret: process.env.SECRET,
    timeExpire: 60 * 60 * 1
  },
  s3: {
    secretAccessKey: process.env.SECRETACCESSKEY,
    accessKeyId: process.env.ACCESSKEYID,
    bucket: process.env.BUCKET,
    region: process.env.REGION
  }
}

module.exports = config
