import Product from '../models/product.model.js'

const getProduct =  async(req,res)=>{
  try {
    const products = await Product.find({})
    console.log("Product found")
    res.status(200).json({
      data: products
    })
  } catch (error) {
    res.status({message:"server error"})
  }
}


const createProduct = async (req,res)=>{
  const product = req.body;
  if(!product.name || !product.price || !product.image ){
    return res.status(400).json({success:false,message:"Please provide all the details"})
  }

  const newProduct = new Product(product);
  try{
    await newProduct.save();
    res.status(201).json({success:true,data:newProduct});
  }catch(err){
    console.error("Error in Create Product:",err.message);
    res.status(500).json({success:false,message:"Server Error" })
  }
}

const updateProduct =  async(req,res)=>{
  const {id} = req.params
  const product = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false,message:"Invalid Product ID"})
  }
  try{
   const updatedProduct =  await Product.findByIdAndUpdate(id,product,{new:true})
    res.status(200).json({message:"Product updated successfully",data:updatedProduct})
  }
  catch(err){
    res.status(400).json({message:err.message})
  }
}

const deleteProduct =  async (req,res)=>{
  const{id} = req.params;
  try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({message:"Product Deleted"})
  }catch(error){
    res.status(404).json({message:"Product Not Found"})
  }
}


export{
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}