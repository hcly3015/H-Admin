function getUploadFileExt (name) {
  let ext = name.split('.')
  return ext[ext.length - 1]
}

module.exports = getUploadFileExt
