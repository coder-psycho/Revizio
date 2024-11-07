import Card from '@/models/Card';
import connectDB from '@/middlewares/connectDB';

const loginHandler = async (req, res) => {
    try {
        const intervals = {
            hard: 1, 
            medium: 10,
            easy: 1440
          };
        const flashcard = await Card.findById(req.body.cardId);
  
        // Update interval based on response
        flashcard.interval = intervals[req.body.difficulty]; // 'again', 'hard', 'good', or 'easy'
        
        // Calculate nextReviewDate by adding interval to current date
        flashcard.nextReviewDate = new Date(Date.now() + flashcard.interval * 60000); // Convert minutes to ms
      
        await flashcard.save();
        res.status(200).json({ type: "success", message: "Card updated" });
      } catch (error) {
        console.log(error)
        res.status(400).json({ type:"error", message: 'Error updating cards' });
      }
};

export default connectDB(loginHandler);