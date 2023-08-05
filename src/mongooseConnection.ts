import mongoose from "mongoose";
let uri = process.env.MONGODB_URI as string;

async function mongooseConnect() {
  console.log("URI", uri);
  let options={}
  try {
    await mongoose.connect(uri, options);
    console.log("Connected")
  } catch (error: any) {
      console.log(error);
  }
}
async function mongooseDisconnect() {
  try {
    await mongoose.connection.close();
    console.log("connection closed");
  } catch (error) {
    console.log(error);
  }
}
export { mongooseConnect, mongooseDisconnect };




