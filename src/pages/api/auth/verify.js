import User from "@/models/User";
import { verifyToken } from "@/utils/jwt";
const verify = async (req, res) => {
    if (req.method == "POST") {

      try {
        
        const verification = verifyToken(req.body.token, process.env.NEXT_PUBLIC_JWT_SECRET);
        if (!verification) {
            return res.status(200).json({ type: "error", message: "Invalid Token" })
        }
        const user = await User.findOne({ email:verification.email, username: verification.username }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 });
      
        res.status(200).json({ type: "success", message: "Token verified", user: user});
      }
      catch(error) {
        console.log(error)
        res.status(500).json({ type: "error", message: "Something went wrong"});

      }

    }
    
    else {
        return res.status(200).json({ error: "Not Allowed" })
    }
}

export default verify;