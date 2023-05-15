const { Client } = require('pg');

exports.handler = async (event) => {
  const client = new Client({
    connectionString: 'postgres://pghjywwz:2R6SujI3nBkhaG1EqdXDLgGrpumoGTyq@tiny.db.elephantsql.com/pghjywwz',
    ssl: {
      rejectUnauthorized: false
    }
  });

  await client.connect();
  console.log('Connected to database');

  try {
    const result = await client.query('SELECT * FROM "myTable" LIMIT 3');
    const data = result.rows;
    console.log('Fetched data:', data);

    const response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };

    return response;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.end();
    console.log('Disconnected from database');
  }
};

