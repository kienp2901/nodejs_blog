var db = require('../models/db');
var slug = require('slug');
class CourseController {
    //[GET] /course/:slug
    show(req, res) {
        let sql = `SELECT * FROM course where slug='` + req.params.slug + `'`;
        db.query(sql, function (err, data) {
            let listData = data;
            res.render('course/show', { listData });
            //res.json(listData);
        });
    }
    //[GET] /course/create
    create(req, res) {
        res.render('course/create');
    }
    //[POST] /course/store
    store(req, res) {
        let name = req.body.name;
        let description = req.body.description;
        let videoId = req.body.videoId;
        let level = req.body.level;
        let sl = slug(req.body.name, { lower: true });
        if (!req.files) return res.status(400).send('No files were uploaded.');

        var file = req.files.image;
        var img_name = file.name;

        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif'
        ) {
            file.mv(
                'src/public/images/upload_images/' + file.name,
                function (err) {
                    if (err) return res.status(500).send(err);
                    var sql =
                        "INSERT INTO `course`(`name`,`description`,`image`,`slug`, `videoId` ,`level`) VALUES ('" +
                        name +
                        "','" +
                        description +
                        "','" +
                        img_name +
                        "','" +
                        sl +
                        "','" +
                        videoId +
                        "','" +
                        level +
                        "')";

                    var query = db.query(sql, function (err, result) {
                        res.redirect('/');
                    });
                },
            );
        }
        // const course = {
        //     name: name,
        //     description: description,
        //     videoId: videoId,
        //     level: level,
        //     image: image,
        //     slug: slug1,
        // };
        // db.query('insert into course SET ?', course, function (err, data) {
        //     if (err) throw err;
        //     res.redirect('/');
        // });
        //res.json(req.body);
    }

    //[GET] /course/:id/edit
    edit(req, res) {
        let sql = `SELECT * FROM course where id='` + req.params.id + `'`;
        db.query(sql, function (err, data) {
            let listData = data;
            res.render('course/edit', { listData });
            //res.json(listData);
        });
    }

    //[POST] /course/update
    update(req, res) {
        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let videoId = req.body.videoId;
        let level = req.body.level;
        let sl = slug(req.body.name, { lower: true });
        if (!req.files) return res.status(400).send('No files were uploaded.');

        var file = req.files.image;
        var img_name = file.name;

        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/gif'
        ) {
            file.mv(
                'src/public/images/upload_images/' + file.name,
                function (err) {
                    if (err) return res.status(500).send(err);
                    db.query(
                        `UPDATE course SET name=?,description=?, videoId=?, level=?, slug=?, image=? WHERE id = ?`,
                        [name, description, videoId, level, sl, img_name, id],
                        function (err, data) {
                            if (err) throw err;
                            res.redirect('/me/stored/courses');
                        },
                    );
                },
            );
        }
    }

    //[DELETE] /course/:id/delete
    delete(req, res) {
        let id = req.params.id;
        let sql = `DELETE FROM course WHERE id = ?`;
        db.query(sql, [id], function (err, data) {
            if (err) throw err;
            res.redirect('back');
        });
    }
}

module.exports = new CourseController();
