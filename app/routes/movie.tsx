import { useLoaderData, Outlet, Link } from "@remix-run/react";
import { getSession, commitSession } from "../sessions";
import { json } from "@remix-run/cloudflare";
import { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const error = session.get("error");
	return json(
		{ error },
		{
			headers: {
				"Set-Cookie": await commitSession(session),
			},
		}
	);
}

export default function Index() {
	let { error } = useLoaderData<typeof loader>();
	return (
		<>
			<main>
				<p>Flash: {error}</p>
				<Outlet />
				<p className="mt-12 text-xs text-gray-500">
					Epoch time just to see movie layout updating: {Date.now()}
				</p>
			</main>
		</>
	);
}
