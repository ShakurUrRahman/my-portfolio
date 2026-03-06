import { Glass } from "..";

export default function AdminMessages({ data, setData }) {
	const del = (id) =>
		setData((d) => ({
			...d,
			messages: d.messages.filter((m) => m.id !== id),
		}));
	return (
		<div className="flex flex-col gap-4">
			{data.messages.length === 0 ? (
				<Glass className="p-10 text-center">
					<p
						className="font-mono text-sm"
						style={{ color: "rgba(200,190,240,.4)" }}
					>
						No messages yet.
					</p>
				</Glass>
			) : (
				data.messages.map((m) => (
					<Glass key={m.id} className="p-6">
						<div className="flex justify-between items-start mb-3">
							<div>
								<span className="font-syne font-semibold text-white text-base">
									{m.name}
								</span>
								<span className="font-mono text-xs text-purple-400 ml-3">
									{m.email}
								</span>
							</div>
							<div className="flex items-center gap-3">
								<span
									className="font-mono text-xs"
									style={{ color: "rgba(200,190,240,.35)" }}
								>
									{m.date}
								</span>
								<button
									onClick={() => del(m.id)}
									className="btn-danger font-mono text-xs rounded-lg px-3 py-1"
									style={{
										cursor: "pointer",
										border: "none",
									}}
								>
									Delete
								</button>
							</div>
						</div>
						<p
							className="font-mono text-xs leading-loose"
							style={{ color: "rgba(200,190,240,.65)" }}
						>
							{m.message}
						</p>
					</Glass>
				))
			)}
		</div>
	);
}
