const mongoose = require('mongoose');
const Survey = require('../models/SurveyModel');

// Create a new survey
exports.createSurvey = async (req, res) => {
  try {
    const newSurvey = new Survey({
      surveyName: req.body.surveyName,
      surveyDescription: req.body.surveyDescription,
      clientId: req.body.clientId,
      totalQues: req.body.totalQues.map((question, index) => {
        const optionGroups = {};
        question.optionGroups.forEach((group) => {
          const selectedOption = group.option;
          const userAnswers = group.userAnswers || [];
          if (!optionGroups[selectedOption]) {
            //optionGroups[selectedOption] = { option: selectedOption, userAnswers: userAnswers || [] };

            optionGroups[selectedOption] = { option: selectedOption, userAnswers: [] };
          }
          optionGroups[selectedOption].userAnswers.push(...userAnswers);
        });
        return {
          questionNumber: index + 1,
          title: question.title,
          options: question.options,
          optionGroups: Object.values(optionGroups),
        };
      }),
      totalRes: req.body.totalRes,
      totalReward: req.body.totalReward,
      statusCampaign: req.body.statusCampaign,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    const savedSurvey = await newSurvey.save();
    res.json({ message: 'Survey created successfully', data: savedSurvey });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


    
    
   
// Get all surveys
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single survey


exports.getSurvey = async (req, res) => {
  res.json(res.survey);
};

exports.getSurveyAnalysis = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.surveyId);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    const analysis = survey.totalQues.map((question) => {
      const options = question.options;
      const optionCounts = options.map((option) => {
        const optionGroup = question.optionGroups.find((group) => group.option === option);
        const count = optionGroup ? optionGroup.userAnswers.length : 0;
        const totalAnswers = question.optionGroups.reduce((total, group) => {
          return total + group.userAnswers.length;
        }, 0);
        const percentage = totalAnswers > 0 ? ((count / totalAnswers) * 100).toFixed(2) : 0;
        return {
          option: option,
          count: count,
          percentage: percentage
        };
      });
      optionCounts.sort((a, b) => b.count - a.count);
      const maxCount = optionCounts[0].count;
      const mostChosenAnswers = optionCounts.filter((optionCount) => optionCount.count === maxCount);
      return {
        question: question.title,
        mostChosenAnswers: mostChosenAnswers.map((optionCount) => optionCount.option),
        userCount: maxCount,
        allAnswers: optionCounts,
      };
    });
    res.json(analysis);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Get expired surveys
exports.getExpiredSurveys = async (req, res) => {
  try {
    const expiredSurveys = await Survey.find({
      endDate: { $lt: new Date() },
    });
    res.json(expiredSurveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update a survey
exports.update = (req, res) => {
  Survey.findByIdAndUpdate(req.params.surveyId, req.body, { new: true })
    .then(survey => {
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send(survey);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Error updating survey with id " + req.params.surveyId
      });
    });
};

// Delete a survey
// Delete a survey with the specified surveyId in the request
exports.delete = (req, res) => {
  Survey.findByIdAndRemove(req.params.surveyId)
    .then(survey => {
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send({ message: "Survey deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Could not delete survey with id " + req.params.surveyId
      });
    });
};



// Middleware function to get survey by ID
exports.findOne = (req, res) => {
  Survey.findById(req.params.surveyId)
    .then(survey => {
      if (!survey) {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      res.send(survey);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Survey not found with id " + req.params.surveyId
        });
      }
      return res.status(500).send({
        message: "Error retrieving survey with id " + req.params.surveyId
      });
    });
};
