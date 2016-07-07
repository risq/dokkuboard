const express = require('express');
const dokku = require('./dokku');
const api = express.Router();

api.get('/apps', (req, res) => {
  dokku.getApps()
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

api.post('/apps', (req, res) => {
  dokku.createApp(req.body.name)
  .then(data => res.json(data))
  .catch(err => res.status(500).json(err));
});

api.delete('/apps/:name', (req, res) => {
  dokku.deleteApp(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

api.get('/apps/:name/urls', (req, res) => {
  dokku.getUrl(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

api.get('/apps/:name/config', (req, res) => {
  dokku.getConfig(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

api.get('/apps/:name/ps', (req, res) => {
  dokku.getPs(req.params.name)
    .then(data => res.json(data))
    .catch(err => res.status(500).json(err));
});

module.exports = api;
