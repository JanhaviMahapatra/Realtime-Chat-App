import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "file", "gif"],
      default: "text",
    },

    fileUrl: {
      type: String,
      default: null,
    },

    fileName: {
      type: String,
      default: null,
    },

    fileType: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },

    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    edited: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model(
  "Message",
  messageSchema
);

export default Message;