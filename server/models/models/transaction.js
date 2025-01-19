const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
