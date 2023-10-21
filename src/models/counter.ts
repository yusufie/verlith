
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number,
  });

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

export default Counter;