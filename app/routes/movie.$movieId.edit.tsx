import { Form, useLoaderData } from "@remix-run/react";
import { getSession, commitSession } from "../sessions";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";

export async function action({ request }: ActionFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	session.flash("error", "Flash error from edit action");
	return redirect("/movie", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}

export async function loader({ request }: LoaderFunctionArgs) {
	return json({});
}

export default function Index() {
	return (
		<>
			<h1 className="text-3xl">Edit Movie</h1>
			<Form method="POST">
				<button type="submit">Save</button>
			</Form>
			<a href="javascript:history.back()">Back</a>
		</>
	);
}
