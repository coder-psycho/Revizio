import Deck from '@/models/Deck';
import connectDB from '@/middlewares/connectDB';

const loginHandler = async (req, res) => {
  try {
        const deck = new Deck({
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          visibility: req.body.visibility,
          subject: req.body.subject,
          tags: req.body.tags.split(",").map((tag) => tag.trim())

        });
        await deck.save();
        return res.status(201).json({ type: "success", message: "Deck created Successfully" });
      } catch (error) {
        console.log(error)
        return res.status(400).json({ type: "error", message: 'Error creating deck' });
      }
};

export default connectDB(loginHandler);