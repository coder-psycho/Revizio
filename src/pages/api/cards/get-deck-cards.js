import Card from '@/models/Card';
import connectDB from '@/middlewares/connectDB';

const loginHandler = async (req, res) => {
    try {
      console.log(req.body.deckId)
        const cards = await Card.find({deckId: req.body.deckId});
        res.status(200).json({ type: "success", cards: cards });
      } catch (error) {
        console.log(error)
        res.status(400).json({ type:"error", message: 'Error fetching cards' });
      }
};

export default connectDB(loginHandler);