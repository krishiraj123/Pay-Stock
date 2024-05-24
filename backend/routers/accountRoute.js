require("dotenv").config();

const mongoose = require("mongoose");
const { Router } = require("express");
const bodyParser = require("body-parser");

const Account = require("../models/account");
const { checkLogin } = require("../middlewares/checklogin");
const router = Router();

router.use(bodyParser.json());

router.get("/balance", checkLogin, async (req, res) => {
  const id = req.user.userId;

  try {
    const account = await Account.findOne({ userId: id });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    return res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/transfer", checkLogin, async (req, res) => {
  const senderId = req.user.userId;
  const { receiverId, amount } = req.body;
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const sender = await Account.findOne({ userId: senderId });
    const receiver = await Account.findOne({ userId: receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (sender.balance < parsedAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await sender.updateOne({ $inc: { balance: -parsedAmount } });
    await receiver.updateOne({ $inc: { balance: parsedAmount } });

    return res.json({ message: "Transfer successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
