const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const classyear = req.body.classyear;
    const description = req.body.description;
    const duration = req.body.duration;
    const yardage = req.body.yardage;
    const date = Date.parse(req.body.date);
    DESCRIPTIONS = ["Swimming"]
    if (!DESCRIPTIONS.includes(description)) {
        res.status(400).json("wtf you trolling bro");
    }
        

    const newExercise = new Exercise({
        username,
        classyear,
        description,
        duration,
        yardage,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.classyear = req.body.classyear;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.yardage = Number(req.body.yardage);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).jason('Error: ' + err));
});

module.exports = router;
