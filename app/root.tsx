import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useRouteLoaderData } from "@remix-run/react";
import "./tailwind.css";
import { commitSession, getSession } from "./sessions";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const error = session.get("error");
	console.log("loading");
	return json(
		{ error },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	/* tsignore-next-line */
	const { error } = useRouteLoaderData("root") as any;
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body className="m-20">
				<p>Flash error: {error || "None"}</p>
				<br />
				{children}
				<ScrollRestoration />
				<Scripts />

				<p className="mt-12 text-xs text-gray-500">Epoch time just to see root updating: {Date.now()}</p>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
