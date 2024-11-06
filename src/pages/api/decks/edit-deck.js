import Article from '@/models/Article';
import connectDB from '@/middlewares/connectDB';


const loginHandler = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.body.deckId, req.body, {
          new: true, // Return the updated article
          runValidators: true, // validations are run
        });
        if (!article) {
          return res.status(404).json({ type: "error", message: 'Deck not found' });
        }
        res.status(200).json({ type: "success", data: article });
      } catch (error) {
        res.status(400).json({ type: "error", message: 'Error updating deck' });
      }
};

export default connectDB(loginHandler);