module.exports = {
  "development": {
    "username": process.env.MYSQL_DEFAULT_USER,
    "password": process.env.MYSQL_DEFAULT_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_DEFAULT_HOST || "localhost",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.MYSQL_DEFAULT_USER,
    "password": process.env.MYSQL_DEFAULT_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_DEFAULT_HOST || "localhost",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.MYSQL_DEFAULT_USER,
    "password": process.env.MYSQL_DEFAULT_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_DEFAULT_HOST || "localhost",
    "dialect": "mysql",
    "operatorsAliases": false
  }
};
