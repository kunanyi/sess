import { Link } from "@remix-run/react";
export default function Index() {
	return (
		<>
			<h1 className="text-3xl">Movie Index</h1>
			<Link
				to="/movie/1/edit/"
				className="underline">
				Edit
			</Link>
			<h2 className="font-bold mt-12">To see the issue</h2>
			<ol className="text-sm">
				<li>- Click edit</li>
				<li>- Click save</li>
				<li>- Observe the error showing correctly from the root using the session flash</li>
				<li>- Now click edit-back-edit-back a few times... see that the session flash never clears</li>
			</ol>
		</>
	);
}
