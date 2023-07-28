import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';

const app = express();

app.use('^/$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (error, data) => {
    if (error) {
      console.log(error)
      return res.status(500).send('Some error happened')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
})

/** 在 express 提供靜態檔案服務，必須使用它的中介軟體方法 express.static(參數) */
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(5000, () => {
  console.log('App launched on 5000')
})