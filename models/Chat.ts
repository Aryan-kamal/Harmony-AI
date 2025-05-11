// models/Chat.js
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
	messages: [
		{
			role: {type: String, enum: ["user", "assistant"], required: true},
			content: {type: String, required: true},
			timestamp: {type: Date, default: Date.now},
		},
	],
});

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
