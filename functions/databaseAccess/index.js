const admin = require('firebase-admin')
const validate = require('./validate')

var serviceAccount = require('./serviceAccountKey.json')

let db

exports.initializeFirebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bargain-basement.firebaseio.com'
  })
  db = admin.database()
}

exports.write = (path, data) => {
  validate.write(path, data)
  db.ref(path).set(data)
}

exports.insert = (path, data) => {
  validate.insert(path, data)
  return db.ref(path).push(data).key
}

exports.remove = path => {
  validate.remove(path)
  db.ref(path).remove()
}

exports.get = async path => {
  validate.get(path)
  let response = await db.ref(path).once('value')
  response = response.val()
  return response
}

exports.AtomicUpdate = class {
  constructor(suppressChecks) {
    this.db = db
    this.data = {}
    this.suppressChecks = Boolean(suppressChecks)
  }

  remove(path) {
    validate.atomicUpdate.remove(path)
    this.data = this.data.filter(entryPath => !entryPath.startsWith(path))
    return this
  }

  remove(path, allowRootKey) {
    validate.atomicUpdate.remove(path)
    if (
      this.suppressChecks ||
      allowRootKey ||
      (path && path.lastIndexOf('/') > 0)
    )
      this.data[path] = null
    return this
  }

  write(path, data, allowRootKey) {
    validate.atomicUpdate.write(path, data)
    if (
      this.suppressChecks ||
      allowRootKey ||
      (path && path.lastIndexOf('/') > 0)
    )
      this.data[path] = data
    return this
  }

  async commit() {
    validate.atomicUpdate.commit(this.data)
    return await this.db.ref().update(this.data)
  }
}
