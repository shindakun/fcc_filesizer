'use strict';

const express = require('express');
const multer = require('multer');
const fs = require('fs');

let upload = multer({ dest: '/tmp'});
let app = express();

app.get('/', function (req, res) {
  res.send(`
    <p>Submit a file to view its filesize.</p>
    <form action="/" method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      <input type="submit">
    </form>
      `);
});
app.post('/', upload.single('file'), function (req, res) {
  if (req.file) {
    fs.unlink(req.file.path);
  }
  res.json({
    'size': req.file.size
  });
});
app.listen(process.env.PORT || 3000);
