const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      title: {
        type: String, 
      },
      description: {
        type: String, 
      },
      subject: {
        type: String, 
      },
      visibility: {
        type: String,
        enum: ["public", "private"] 
      },
      tags: {
        type: [String], // Array of strings for tags
        default: []
      },
    }, { timestamps: true });

mongoose.models = {}

module.exports = mongoose.model('Deck', deckSchema)