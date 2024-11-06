import Deck from '@/models/Deck';
import connectDB from '@/middlewares/connectDB';

const loginHandler = async (req, res) => {
    try {
      console.log(req.body.userId)
        const decks = await Deck.find({userId: req.body.userId});
        res.status(200).json({ type: "success", decks: decks });
      } catch (error) {
        console.log(error)
        res.status(400).json({ type:"error", message: 'Error fetching articles' });
      }
};

export default connectDB(loginHandler);