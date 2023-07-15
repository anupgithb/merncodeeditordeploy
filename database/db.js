import mongoose from 'mongoose';
export const Connection = async(URL) =>{
    
    try{
       await mongoose.connect(URL, {useUnifiedTopology : true ,useNewUrlParser:true});
       console.log("DataBase connection successfully");
    }catch(error){
        console.log('Error while connnecting with database ', error.message);
    }
}
export default Connection;