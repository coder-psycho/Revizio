import Card from '@/models/Card';
import connectDB from '@/middlewares/connectDB';

const addCardHandler = async (req, res) => {
  try {
        const card = new Card({
          front: req.body.front,
          back: req.body.back,
          deckId: req.body.deckId
        });
        await card.save();
        return res.status(201).json({ type: "success", message: "Card added Successfully" });
      } catch (error) {
        console.log(error)
        return res.status(400).json({ type: "error", message: 'Error adding card' });
      }
};

export default connectDB(addCardHandler);