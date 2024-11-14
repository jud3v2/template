const mysql = require("mysql");
const config = require("../config");
const fs = require("fs");

const getConnexion = () => {
  return mysql.createPool({
    host: config.mysqlHost,
    user: config.mysqlDBUser,
    password: config.mysqlDBPWD,
    database: config.mysqlDBName,
    port: config.mysqlPort,
    [config.mysqlSSL ? "ssl" : "dreamservices"]: {
      ca: config.mysqlSSL ? fs.readFileSync("ca-certificate.pem") : null,
    },
    //insecureAuth: true,
    //supportBigNumbers: true,
    //connectionLimit: 10,
    //multipleStatements: true, // Attention à l'injection SQL
  });
};

let con = getConnexion();

con.on("error", function (err) {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    con = mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlDBUser,
      password: config.mysqlDBPWD,
      database: config.mysqlDBName,
    });
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT") {
    con = mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlDBUser,
      password: config.mysqlDBPWD,
      database: config.mysqlDBName,
    });
  } else if (err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
    con = mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlDBUser,
      password: config.mysqlDBPWD,
      database: config.mysqlDBName,
    });
  } else if (err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE") {
    con = mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlDBUser,
      password: config.mysqlDBPWD,
      database: config.mysqlDBName,
    });
  } else if (err.code === "ETIMEDOUT") {
    con = mysql.createConnection({
      host: config.mysqlHost,
      user: config.mysqlDBUser,
      password: config.mysqlDBPWD,
      database: config.mysqlDBName,
    });
  }
});

module.exports.close = () => {
  return new Promise((resolve, reject) => {
    con.end((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = con;
