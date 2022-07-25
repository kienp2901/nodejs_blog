var db = require('../models/db');
class SiteController {
    //[GET] /
    index(req, res) {
        let sql = `SELECT * FROM course`;
        db.query(sql, function (err, data) {
            let listData = data;
            res.render('home', { listData });
            //res.json(listData);
        });
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
