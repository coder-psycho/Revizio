import bcrypt from 'bcryptjs';
import User from "@/models/User";
import connectDB from '@/middlewares/connectDB';

const signupHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, password, username } = req.body;

  const user = await User.findOne({username: username})

  if (user) {
    return res.status(400).json({message: "User already exists", type: "error"})
  }

  else {



    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
            username:username,
            email: email,
            password: hashedPassword
        })
    
        await user.save();
      res.status(201).json({ type:"success", message: 'Account created successfully' });
    }
};

export default connectDB(signupHandler);