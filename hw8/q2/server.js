const express = require('express');
const app = express();
const router = express.Router();

app.use(express.static('public'))