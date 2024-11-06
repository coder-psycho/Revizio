import Deck from '@/models/Deck';
import connectDB from '@/middlewares/connectDB';


const loginHandler = async (req, res) => {
    try {
        const deletedDeck = await Deck.findByIdAndDelete(req.body.deckId);
        if (!deletedDeck) {
          return res.status(404).json({ type: "success", message: 'Deck not found' });
        }
        res.status(200).json({ type: "success", message: "Deck deleted successfully" });
      } catch (error) {
        res.status(400).json({ type: "error", message: 'Error deleting Deck' });
      }
};

export default connectDB(loginHandler);