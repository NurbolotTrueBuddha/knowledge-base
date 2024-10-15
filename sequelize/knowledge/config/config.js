require('dotenv').config();

const [uri, db_type, username, password, host, port, database] =
  process.env.DATABASE_URI.match(
    /([^:]*):\/\/([^:]*):([^@]*)@([^:]*):(\d+)\/(.*)/,
  );

const dbConfig = {
  username,
  password,
  database,
  host,
  port,
  dialect: 'postgresql',
};

module.exports = {
  development: dbConfig,
  production: dbConfig,
};
