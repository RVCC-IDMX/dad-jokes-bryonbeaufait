// const fetch = require('node-fetch');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event, context) => {
  const url = 'https://icanhazdadjoke.com/';
  try {
    const jokeStream = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });
    const jsonJoke = await jokeStream.json();
    return {
      statusCode: 200,
      body: JSON.stringify(jsonJoke),
    };
  } catch (err) {
    return { statuscode: 422, body: err.stack };
  }
};
