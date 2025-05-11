import mongoose, {model, models} from "mongoose";
export type UserInfo = {
	clerkUserId: string;
	email: string;
	name: string;
	imageUrl: string;
};
const userInfoSchema = new mongoose.Schema<UserInfo>(
    {
        clerkUserId:{type:String,unique:true,required:true},
		email: {type: String, unique: true, required: true},
		name: {type: String},
        imageUrl: String,
	},
	{timestamps: true}
);
export const UserInfoModel =
	models?.UserInfo || model<UserInfo>("UserInfo", userInfoSchema);
