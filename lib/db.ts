import mysql from 'mysql2/promise';

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_USER: user,
  DB_PASS: password,
  DB_SCHEMA: database,
} = process.env;

const config = {
  host,
  port: Number(port),
  user,
  password,
  database,
};

export const query = async <T>(sql: string, params: unknown[] = []) => {
  const conn = await mysql.createConnection(config);

  try {
    // const [results, fields] = await conn.execute(sql, params);
    const [results] = await conn.execute(sql, params);

    return results as T[];
  } catch (error) {
    throw error;
  } finally {
    conn.end();
  }
};
