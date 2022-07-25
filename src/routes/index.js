const newsRoute = require('./news');
const meRoute = require('./me');
const siteRoute = require('./site');
const courseRoute = require('./course');
function route(app) {
    app.use('/news', newsRoute);

    app.use('/', siteRoute);

    app.use('/course', courseRoute);

    app.use('/me', meRoute);
}

module.exports = route;
