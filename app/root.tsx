import { Links, Meta, Outlet, Scripts, ScrollRestoration, json, useRouteLoaderData } from "@remix-run/react";
import "./tailwind.css";
import { commitSession, getSession } from "./sessions";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export function Layout({ children }: { children: React.ReactNode }) {
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
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
