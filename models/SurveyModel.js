const mongoose = require('mongoose')

const surveySchema = new mongoose.Schema({ 
  surveyName: {
    type: String,
    required: true
  },
  surveyDescription: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    ref: 'Client',
    required: true
  },
  totalQues: [{
    questionNumber: { 
      type: Number,
      required: true
    },
    title: { 
      type: String,
      required: true
    },
    options: [{ 
      type: String,
      required: true
    }],
    optionGroups: [{
      option: {
        type: String,
        
      },
      userAnswers: [{
        type: String,
        ref: 'User',
        
      }]
    }]
  }],
  totalRes: {
    type: Number,
    
  },
  totalReward: {
    type: Number,
    required: true
  },
  statusCampaign: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;