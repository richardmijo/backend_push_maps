const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, '../../firebase/uide-43a9f-firebase-adminsdk-fbsvc-34fab192ed.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
