const mongoose = require("mongoose"); // Import mongoose
const Message = require("../Model/Message");
const Conversation = require("../Model/Conversation");

// create message
const sendMessage = async (req, res) => {
  const { id: receiverId } = req.params;
  const { message } = req.body;
  const senderId = req.user._id; // sender's ID from the authenticated user

  console.log("Sender ID:", senderId);
  console.log("Receiver ID:", receiverId);

  try {
    // Find an existing conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }, // Ensures both sender and receiver are in the participants array
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId], // Make sure participants is an array of ObjectIds
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Save the message to the database
    //await newMessage.save();

    // Add the new message to the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save the updated conversation
    // await conversation.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
    // Respond with the new message
    res
      .status(201)
      .json({ msg: `Message sent by ${senderId}`, message: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports = {
  sendMessage,
};
