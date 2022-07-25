var db = require('../models/db');
class MeController {
    //[GET] /stored/courses
    storedCourses(req, res) {
        let sql = `SELECT * FROM course`;
        db.query(sql, function (err, data) {
            let listData = data;
            res.render('me/stored-courses', { listData });
            //res.json(listData);
        });
    }
}

module.exports = new MeController();
