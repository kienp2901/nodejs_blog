const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
// CourseController.index;
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/:id/update', courseController.update);
router.get('/:id/delete', courseController.delete);
router.get('/:slug', courseController.show);

module.exports = router;
