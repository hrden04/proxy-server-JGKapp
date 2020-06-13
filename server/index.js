const express = require('express');
const morgan = require('morgan');
const path = require('path');
const proxy = require('express-http-proxy');
const cors = require('cors');
const config = require('../config.js');

const PORT = config.app.port;
const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.static(path.join(__dirname, '../client/dist')));

// Question answer module
app.use('/question-answers', proxy(config.proxies.qna));

app.use('/api/products/questions', proxy(config.proxies.qna, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/questions${queryString ? `?${queryString}` : ''}`;
  },
}));

app.use('/api/products/answers', proxy(config.proxies.qna, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/answers${queryString ? `?${queryString}` : ''}`;
  },
}));

// Similar Products
app.use('/similar-products', proxy(config.proxies.similar));

app.use('/api/similar_products/feedback', proxy(config.proxies.similar, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/similar_products/feedback${queryString ? `?${queryString}` : ''}`;
  },
}));

app.use('/api/similar_products', proxy(config.proxies.similar, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/similar_products${queryString ? `?${queryString}` : ''}`;
  },
}));

// reviews
app.use('/customer-reviews', proxy(config.proxies.reviews));

app.use('/api/products/reviews', proxy(config.proxies.reviews, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/reviews${queryString ? `?${queryString}` : ''}`;
  },
}));

// Images
app.use('/image-view', proxy(config.proxies.images));

app.use('/api/products/images', proxy(config.proxies.images, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/images${queryString ? `?${queryString}` : ''}`;
  },
}));

// Description
app.use('/product-description', proxy(config.proxies.description));

app.use('/api/products/descriptions', proxy(config.proxies.description, {
  proxyReqPathResolver: (req) => {
    const parts = req.url.split('?');
    const queryString = parts[1];
    return `/api/products/descriptions${queryString ? `?${queryString}` : ''}`;
  },
}));

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Now listening on port: ', PORT));
