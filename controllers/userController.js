import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 


// ==================================================       
// POST : SAVE USER DATA
// ==================================================
export const saveUser = async (req, res) => {
  
   try{



        if(req.userData == null){
            return res.status(401).json({
                status: "error",
                message: "Authentication required. Please log in."
            });
        }

        if(req.userData.role !== 'admin'){
            return res.status(403).json({
                status: "error",
                message: "Permission denied. Only admins can add users."
            });
        }

    const existEmail = await User.findOne({ email: req.body.email });

    if (existEmail != null) {  
        return res.status(400).json({
            status: "error",
            message: "Email already exists"
        });
    }

     const hashPassword =  bcrypt.hashSync(req.body.password, 10); 
     const user = new User({    
      email : req.body.email,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      password : hashPassword,    
      role : req.body.role
     });

     await user.save();

     return res.status(201).json({ 
      status: "success",
      message: "User saved successfully" 
   });

   } catch (error) {
     console.error("Error saving user:", error);

     return res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
     });

   }
};


// ==================================================       
// POST : USER LOGIN
// ==================================================
export const userLogin = async (req, res) => {
   try {

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email }); 
    // Check if user exists 
    if (user == null) {
      console.error("Login failed: User not found");
      return res.status(404).json({
        status: "error",
        message: "Email or password is incorrect"
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {   

     // Generate JWT token --------------------------------------------------

      const secret = process.env.JWT_SECRET; 
      const expiresInHours = process.env.JWT_EXPIRES_IN_HOURS ; 
      const expireString = `${expiresInHours}h`;

      const token = jwt.sign(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
          secret, 
          { expiresIn: expireString }
        );
      //-----------------------------------------------------------------------
        return res.status(200).json({
          status: "success",
          message: "Login successful",
          token: token,
          expiresIn: expireString,
          role: user.role,
          firstName: user.firstName,  
          lastName: user.lastName,     
          email: user.email            
        });

    }else {
      console.error("Login failed: Incorrect password");
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    
  }

  } catch (error) {

    console.error("Error during login:", error);

    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }

};

// ==================================================       
// POST : REGISTER USER
// ==================================================
export const registerUser = async (req, res) => {
  
   try{

    const existEmail = await User.findOne({ email: req.body.email });

    if (existEmail != null) {  
        return res.status(400).json({
            status: "error",
            message: "Email already exists"
        });
    }

     const hashPassword =  bcrypt.hashSync(req.body.password, 10); 

     const user = new User({    
      email : req.body.email,
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      password : hashPassword,    
      role : req.body.role
     });

     await user.save();

     return res.status(201).json({ 
      status: "success",
      message: "User registered successfully" 
   });

   } catch (error) {
     console.error("Error saving user:", error);

     return res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
     });

   }
};


// ==================================================       
// GET : FETCH ALL USERS
// ==================================================
export const getAllUsers = async (req, res) => {
   try{

     const users = await User.find();

     return res.status(200).json({ 
      status: "success",
      data: users
     });

   } catch (error) {
     console.error("Error fetching users:", error);

     return res.status(500).json({ 
      status: "error",
      message: "Internal server error" 
     });
   }
};


export function isAdmin(req, res) {
      
        if(req.userData == null){
            return false;
        }

        if(req.userData.role !== 'admin'){
            return false;
        }

        return true;
}