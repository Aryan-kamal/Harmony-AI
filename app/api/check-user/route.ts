import {NextResponse} from "next/server";
import {currentUser} from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongoDB";
import {UserInfoModel} from "@/models/User";

export const GET = async () => {
	try {
		const user = await currentUser();
		if (!user) {
			return NextResponse.json({user: null}, {status: 401});
		}

		await dbConnect();

		let foundUser = await UserInfoModel.findOne({clerkUserId: user.id});

		if (!foundUser) {
			const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
			foundUser = await UserInfoModel.create({
				clerkUserId: user.id,
				name,
				imageUrl: user.imageUrl,
				email: user.emailAddresses[0].emailAddress,
			});
		}

		return NextResponse.json({user: foundUser}, {status: 200});
	} catch (err: any) {
		console.error("Error in check-user API:", err.message);
		return NextResponse.json({error: "Server error"}, {status: 500});
	}
};
