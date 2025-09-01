import mongoose from "mongoose";

const confessionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add some text"],
    minlength: [5, "Text must be at least 5 characters"],
    maxlength: [500, "Text cannot be more than 500 characters"],
    trim: true, // removes leading/trailing spaces
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
    index: true, // Add index for faster queries
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt field whenever the document is modified
confessionSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

const Confession = mongoose.model("Confession", confessionSchema);
export default Confession;
