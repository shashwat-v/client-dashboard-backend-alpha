const express = require('express');
const router = express.Router();
const SurveyController = require('../controllers/SurveyController');

// Create a new survey
router.post('/', SurveyController.createSurvey);

// Get a list of all surveys
router.get('/', SurveyController.getSurveys);

// Get a single survey by ID
router.get('/:surveyId', SurveyController.findOne);

// Update a survey by ID
router.put('/:surveyId', SurveyController.update);

// Delete a survey by ID
router.delete('/:surveyId', SurveyController.delete);
// Get expired surveys
router.get('/expired/data', SurveyController.getExpiredSurveys);

// Get analysis of the most chosen answer for each question
router.get('/:surveyId/analysis', SurveyController.getSurveyAnalysis);

module.exports = router;

/*const express = require('express');
const router = express.Router();
const SurveyController = require('../controllers/SurveyController');

// Create a new survey
router.post('/', SurveyController.createSurvey);

// Get a list of all surveys
router.get('/', SurveyController.getSurveys);



// Get a single survey by ID
router.get("/:surveyId", SurveyController.findOne);

// Update a survey by ID
router.put("/:surveyId", SurveyController.update);


// Delete a survey by ID
router.delete('/:surveyId', SurveyController.deleteSurveyById);

module.exports = router;*/
