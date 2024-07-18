//it is uesd for connect as v4 and v2 for saving time to rewrite the whole code once 

const cds = require("@sap/cds");
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");
cds.on("bootstrap", (app) => app.use(cov2ap()));
module.exports = cds.server;