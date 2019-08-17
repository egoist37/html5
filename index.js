const express = require('express');
const settings = require('./settings');
const names = require('./names');

const application = express();
const PORT = settings.port || 8000;

function getRandomNumber(maxNumber) {
  return Math.round(Math.random() * maxNumber);
};

function generateUser() {
  const name = names[getRandomNumber(names.length - 1)];
  const secondName = names[getRandomNumber(names.length - 1)];

  return {
    name,
    secondName
  };
}

function getUsers(amount) {
  let users = [];
  while(amount) {
    users.push(generateUser());
    amount--;
  }
  return users;
}

application.get('/users', (request, response) => {
    console.log('QUERY: ', request.query);
    const q = request.query;
    const usersCount = q.n || q.num || q.number || q.amount || 1;
    const users = getUsers(usersCount);

    response.json(users);
});

application.listen(PORT, () => {
  console.log('server started on: ', PORT, ' port');
});