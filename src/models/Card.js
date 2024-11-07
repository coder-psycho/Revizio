const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Deck"
      },
      front: {
        type: String, 
      },
      back: {
        type: String, 
      },
      interval: { type: Number, default: 1 }, // in minutes or days depending on implementation
      nextReviewDate: { type: Date, default: Date.now },
    }, { timestamps: true });

mongoose.models = {}

module.exports = mongoose.model('Card', deckSchema)