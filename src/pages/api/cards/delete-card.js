import Card from '@/models/Card';
import connectDB from '@/middlewares/connectDB';


const cardHandler = async (req, res) => {
    try {
        const deletedDeck = await Card.findByIdAndDelete(req.body.cardId);
        if (!deletedDeck) {
          return res.status(404).json({ type: "success", message: 'Card not found' });
        }
        res.status(200).json({ type: "success", message: "Card deleted successfully" });
      } catch (error) {
        res.status(400).json({ type: "error", message: 'Error deleting Card' });
      }
};

export default connectDB(cardHandler);