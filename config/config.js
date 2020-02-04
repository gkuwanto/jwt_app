module.exports = {
  'development': {
    'username': process.env.MYSQL_DEFAULT_USER,
    'password': process.env.MYSQL_DEFAULT_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'host': process.env.MYSQL_DEFAULT_HOST || 'localhost',
    'dialect': 'mysql'
  },
  'test': {
    'username': process.env.MYSQL_DEFAULT_USER,
    'password': process.env.MYSQL_DEFAULT_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'host': process.env.MYSQL_DEFAULT_HOST || 'localhost',
    'dialect': 'mysql'
  },
  'production': {
    'username': process.env.MYSQL_DEFAULT_USER,
    'password': process.env.MYSQL_DEFAULT_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'host': process.env.MYSQL_DEFAULT_HOST || 'localhost',
    'dialect': 'mysql',
    'logging':false
  }
};
