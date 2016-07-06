const express = require('express');
const dokku = require('./dokku');
const api = express.Router();

api.get('/apps', (req, res) => {
  dokku.getApps()
    .then(apps => res.json(apps))
    .catch(err => res.status(500).json(err));
});

api.get('/apps/:name', (req, res) => {
  dokku.getApp(req.params.name)
    .then(apps => res.json(apps))
    .catch(err => res.status(500).json(err));
});

api.post('/apps', (req, res) => {
  dokku.createApp(req.body.name)
  .then(apps => res.json(apps))
  .catch(err => res.status(500).json(err));
});

api.delete('/apps/:name', (req, res) => {
  dokku.deleteApp(req.params.name)
    .then(apps => res.json(apps))
    .catch(err => res.status(500).json(err));
});

module.exports = api;
