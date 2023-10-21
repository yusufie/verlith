
import CounterModel from "./counter";

async function getNextSequenceValue(sequenceName:any) {
    const counter = await CounterModel.findByIdAndUpdate(
      sequenceName,
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return counter.sequence_value;
  }

export default getNextSequenceValue;