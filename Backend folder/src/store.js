const crypto = require('crypto');

const collections = {
  users: [],
  assessments: [],
  moods: [],
  journals: [],
  chats: [],
};

function id() {
  return crypto.randomUUID();
}

function insert(collection, value) {
  const record = { _id: id(), createdAt: new Date(), updatedAt: new Date(), ...value };
  collections[collection].push(record);
  return record;
}

function find(collection, predicate) {
  return collections[collection].filter(predicate);
}

function findOne(collection, predicate) {
  return collections[collection].find(predicate) || null;
}

function update(collection, predicate, patch) {
  const record = findOne(collection, predicate);
  if (!record) return null;
  Object.assign(record, patch, { updatedAt: new Date() });
  return record;
}

function remove(collection, predicate) {
  const index = collections[collection].findIndex(predicate);
  if (index === -1) return false;
  collections[collection].splice(index, 1);
  return true;
}

module.exports = { collections, insert, find, findOne, update, remove };
