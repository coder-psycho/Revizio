import Deck from '@/models/Deck';
import Card from '@/models/Card';
import connectDB from '@/middlewares/connectDB';
const mongoose = require('mongoose');
const loginHandler = async (req, res) => {
    try {

        console.log(req.body.deckId, req.body.userId)
    
      const originalDeck = await Deck.findById(req.body.deckId);
      if (!originalDeck){
          res.status(200).json({ type: "error", message: "Deck not found" });
      }
      const clonedDeck = originalDeck.toObject();
      delete clonedDeck._id; // Remove _id to create a new one
      const userObjectId = new mongoose.Types.ObjectId(req.body.userId);
      clonedDeck.userId = userObjectId; // Assign new userID
      const newDeck = await Deck.create(clonedDeck); // Save the new deck
      const newDeckId = newDeck._id;

      console.log(newDeck);


      // Step 2: Clone all Cards associated with the Deck
    const originalCards = await Card.find({ deckId: req.body.deckId });
    const clonedCards = originalCards.map(card => {
      const clonedCard = card.toObject();
      delete clonedCard._id;
      clonedCard.userID = req.body.userId; // Assign new userID
      clonedCard.deckId = newDeckId; // Link to new deck
      return clonedCard;
    });

    // Step 3: Insert cloned cards
    await Card.insertMany(clonedCards);
    res.status(200).json({ type:"success", message: 'Deck Imported Successfully' });
      } catch (error) {
        console.log(error)
        res.status(400).json({ type:"error", message: 'Error importing deck' });
      }
};

export default connectDB(loginHandler);