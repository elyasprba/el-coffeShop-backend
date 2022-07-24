const { createClient } = require('redis');

const client = createClient({
   url: process.env.REDIS_URL,
});

const redisConn = async () => {
   try {
      client.on('error', (err) => console.log(err));
      await client.connect();
      console.log('Redis Connected');
   } catch (error) {
      console.log(error);
   }
};

module.exports = { redisConn, client };
