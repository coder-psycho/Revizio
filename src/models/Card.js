const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    deckId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Deck"
      },
      front: {
        type: String, 
      },
      back: {
        type: String, 
      }
    }, { timestamps: true });

mongoose.models = {}

module.exports = mongoose.model('Card', deckSchema)