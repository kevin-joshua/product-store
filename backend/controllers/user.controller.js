import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";


const registerUser = expressAsyncHandler(async (req,res)=>{
  const {name,email,password} = req.body;
  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400)
    throw new Error("User already exists")
  }
  const user = await User.create({
    name,
    email,
    password
  });
  if(user){
    generateToken(res,user._id);
    res.status(201).json({
      id:user._id,
      name:user.name,
      email:user.email,
    })

  }
  else{
    res.status(404)
    throw new Error("Invalid user data")
  }
})

const authUser = expressAsyncHandler(async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email})
  if(user && (await user.comparePassword(password))){
    generateToken(res,user._id);
    res.status(201).json({
      id:user._id,
      name:user.name,
      email:user.email
    })
  }
  else{
    res.status(400)
    throw new Error('Invalid User data')
  }
})

const updateUser = expressAsyncHandler(async (req,res)=>{
  const user = User.findById(req.user.id);

  if(user){
  user.name = req.body.name || User.name;
  user.email = req.body.password || User.email;
  user.password = req.body.password || User.password;
}
else{
  res.status(404);
  throw new Error("User not found");
}
res.status(200).json({message:'Update User Profile'})
})

const logoutUser = expressAsyncHandler(async (req,res)=>{
res.cookie('jwt','',{
  expires: new Date(0),
})
res.status(200).json({message:"User logged out"})
})

const getUserProfile = expressAsyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  
  res.status(200).json(user);
});


export{
  registerUser,
  authUser,
  updateUser,
  logoutUser,
  getUserProfile

}
