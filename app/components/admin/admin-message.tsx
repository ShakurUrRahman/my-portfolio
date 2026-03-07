import { Glass } from "..";

export default function AdminMessages({ data, setData }) {
	const del = (id) =>
		setData((d) => ({
			...d,
			messages: d.messages.filter((m) => m.id !== id),
		}));
	return (
		<div className="flex flex-col gap-3 sm:gap-4">
			{data.messages.length === 0 ? (
				<Glass className="p-8 sm:p-10 text-center">
					<p
						className="font-mono text-sm"
						style={{ color: "rgba(200,190,240,.4)" }}
					>
						No messages yet.
					</p>
				</Glass>
			) : (
				data.messages.map((m) => (
					<Glass key={m.id} className="p-4 sm:p-5 md:p-6">
						{/* Stack on mobile, row on sm+ */}
						<div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
							<div className="min-w-0">
								<span className="font-syne font-semibold text-white text-sm sm:text-base">
									{m.name}
								</span>
								<span className="font-mono text-xs text-purple-400 md:ml-2 sm:ml-3 block sm:inline truncate">
									{m.email}
								</span>
							</div>
							<div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
								<span
									className="font-mono text-xs"
									style={{ color: "rgba(200,190,240,.35)" }}
								>
									{m.date}
								</span>
								<button
									onClick={() => del(m.id)}
									className="btn-danger font-mono text-xs rounded-lg px-2.5 sm:px-3 py-1"
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
