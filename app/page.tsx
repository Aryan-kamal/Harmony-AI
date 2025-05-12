import {getHumeAccessToken} from "@/utils/getHumeAccessToken";
import {SignedIn, SignedOut, SignInButton, SignUpButton} from "@clerk/nextjs";
import dynamic from "next/dynamic";

const Chat = dynamic(() => import("@/components/Chat"), {
	ssr: false,
});

export default async function Page() {
	const accessToken = await getHumeAccessToken();

	if (!accessToken) {
		throw new Error();
	}

	return (
		<div className={"grow flex flex-col"}>
			<SignedIn>
				<Chat accessToken={accessToken} />
			</SignedIn>
		</div>
	);
}
