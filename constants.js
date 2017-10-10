const fs = require('fs');
const strProd = "production";

module.exports = {
    buildProd: process.env.NODE_ENV === strProd,
    appRoot: fs.realpathSync(process.cwd()),
};
