
import mongoose from 'mongoose';

 export const connectDB =  () => {
  try {
    const uri = "mongodb+srv://aman:Aman2122@cluster0.6j5f5pb.mongodb.net/?retryWrites=true&w=majority";
     mongoose.connect(uri)
     .then(()=>{
       console.log('MongoDB Connected');
     })
  }
  catch(err){
    console.log(err)
  }   
}




