import Deck from '@/models/Deck';
import connectDB from '@/middlewares/connectDB';

const loginHandler = async (req, res) => {
    try {
        const deck = await Deck.findById(req.body.deckId);
        res.status(200).json({ type: "success", deck: deck });
      } catch (error) {
        console.log(error)
        res.status(400).json({ type:"error", message: 'Error fetching deck' });
      }
};

export default connectDB(loginHandler);