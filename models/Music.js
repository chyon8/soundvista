import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const musicSchema = new Schema(
  {
    artwork: {
      type: String,
      required:false
    
    },
    audiofile:{
      type:String,
      required:false
    },
  
    title: {
      type: String,
    
    },
    artist: {
      type: String,
      required:false
    },
    duration: {
      type: String,
    
    },
    
    genre: {
      type: Array
    
    },
    mood: {
      type: Array,
    
    
    },
  
    theme: {
      type: Array,
     
    },
    
  

  },

  {
    timestamps: true,
  }
);

const Music = mongoose.models.Music || mongoose.model("Music", musicSchema);

export default Music;
