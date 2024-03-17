//  connect to mogodb

import mongoose from "mongoose";

let isConnected = false;

async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("Already connected to mongodb");

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log("MONGODB is connected");
  } catch (error) {
    console.log(`MnogoDB connection error ::  ${error} `);
  }
}

export default connectToDB;
