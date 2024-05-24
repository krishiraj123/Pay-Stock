const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    trim: true,
  },
  balance: { type: Number, required: true, default: 0.0 },
});

module.exports = mongoose.model("Account", accountSchema);
