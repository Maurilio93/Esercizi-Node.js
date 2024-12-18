import pgPromise from "pg-promise";

const db = pgPromise()(
  "postgres://postgres:postgres@localhost:5432/Planets_database"
);
console.log(db);

const setUpdb = async () => {
  await db.none(`
    DROP TABLE IF EXISTS planets;
    DROP TABLE IF EXISTS users;

    CREATE TABLE planets (
      id SERIAL NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );

    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    );
  `);

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(
    `INSERT INTO users (username, password) VALUES ('mauro', 'mauro')`
  );

  const planets = await db.many(`SELECT * FROM planets;`);
  console.log(planets);
};

setUpdb();

export { db };
