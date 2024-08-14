import mongoose from "mongoose";
const connectDB = async() =>{
  // try{
  //   const conn = await mongoose.connect(process.env.MONGO_URL)
  //   console.log(`Connected to Mongodb Database ${conn.connection.host}`)
  // }catch(error){
  //   console.log(`Error in Mongodb ${error}`)
  // }

  // await mongoose
  // .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  // .then(async () => {
  //   console.log("connected to the database");})
  // .catch((e) => {
  //     console.log("---------------failed", e);
  //   });
  await mongoose
  .connect("mongodb://localhost:27017/Ecommerce", { useNewUrlParser: true })
  .then(async () => {
    console.log("connected to the database");})
  .catch((e) => {
      console.log("---------------failed", e);
    });

}
export default connectDB