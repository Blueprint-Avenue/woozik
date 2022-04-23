import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import img from "../../Assets/Wu.png";
import Loader from "../../components/Loader";

function Signin({ providers }) {
	// const { data: session } = useSession();
	// const router = useRouter();

	// useEffect(() => {
	// 	if (session) {
	// 		router.push("/");
	// 	}
	// }, [session]);

	// if (session) return <Loader />;

	return (
		<div className="bg-[#346751] h-screen flex flex-col items-center pt-40 space-y-8">
			<Head>
				<title>Login - Woozik</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Image
				src={img}
				width={300}
				height={600}
				objectFit="contain"
				className="animate-pulse"
			/>
			{Object.values(providers).map((provider) => (
				<div key={provider.id}>
					<button
						className="text-[#ECDBBA] py-4 px-6 rounded-full bg-[#C84B31] transition duration-300 ease-out border border-transparent uppercase font-bold text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#161616]"
						onClick={() => signIn(provider.id, { callbackUrl: "/" })}
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
}

export default Signin;

// server side props - build the page on the server, fetch the providers.... it calls api/auth/providers and returns a list of the auth providers -- returns as props to use in signin

export async function getServerSideProps() {
	const providers = await getProviders();
	return {
		props: { providers },
	};
}
