import { useState } from "react";
import { Glass } from "..";

const blankExp = {
	id: 0,
	company: "",
	role: "",
	type: "Full-time",
	duration: "",
	location: "",
	description: "",
	achievements: [] as string[],
	tags: [] as string[],
	current: false,
};

const TYPES = ["Full-time", "Freelance", "Internship", "Part-time"];

function ExpForm({
	initial,
	onSave,
	onCancel,
}: {
	initial: any;
	onSave: (v: any) => void;
	onCancel: () => void;
}) {
	const [form, setForm] = useState({ ...initial });
	const [achInput, setAchInput] = useState("");
	const [tagInput, setTagInput] = useState("");

	const addAch = () => {
		if (!achInput.trim()) return;
		setForm({
			...form,
			achievements: [...form.achievements, achInput.trim()],
		});
		setAchInput("");
	};

	const addTag = () => {
		if (!tagInput.trim()) return;
		setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
		setTagInput("");
	};

	return (
		<Glass className="p-5 sm:p-7 mb-5">
			<h3 className="font-syne font-bold text-white text-base sm:text-lg mb-5">
				{initial.id ? "Edit Experience" : "New Experience"}
			</h3>

			{/* Company + Role */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
				{[
					{ label: "Company", key: "company", ph: "e.g. Google" },
					{
						label: "Role / Title",
						key: "role",
						ph: "e.g. Frontend Developer",
					},
					{
						label: "Duration",
						key: "duration",
						ph: "e.g. Jan 2023 – Present",
					},
					{
						label: "Location",
						key: "location",
						ph: "e.g. Remote / Dhaka, BD",
					},
				].map(({ label, key, ph }) => (
					<div key={key}>
						<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
							{label}
						</label>
						<input
							value={form[key]}
							onChange={(e) =>
								setForm({ ...form, [key]: e.target.value })
							}
							placeholder={ph}
							className="field-input"
						/>
					</div>
				))}
			</div>

			{/* Type + Current */}
			<div className="flex flex-wrap items-center gap-4 mb-4">
				<div>
					<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
						Type
					</label>
					<div className="flex gap-2 flex-wrap">
						{TYPES.map((t) => (
							<button
								key={t}
								onClick={() => setForm({ ...form, type: t })}
								className={`font-mono text-xs rounded-lg px-3 py-1.5 ${form.type === t ? "btn-success" : "btn-muted"}`}
								style={{ cursor: "pointer", border: "none" }}
							>
								{t}
							</button>
						))}
					</div>
				</div>

				<div className="flex items-center gap-3 mt-4 sm:mt-6">
					<label className="font-mono text-xs uppercase tracking-widest text-purple-400">
						Current Role
					</label>
					<div
						onClick={() =>
							setForm({ ...form, current: !form.current })
						}
						className={`w-11 h-6 rounded-full relative transition-all duration-300 border ${form.current ? "toggle-on" : "toggle-off"}`}
						style={{
							cursor: "pointer",
							borderColor: "rgba(255,255,255,.1)",
						}}
					>
						<div
							className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
							style={{ left: form.current ? "22px" : "2px" }}
						/>
					</div>
				</div>
			</div>

			{/* Description */}
			<div className="mb-4">
				<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
					Description
				</label>
				<textarea
					value={form.description}
					onChange={(e) =>
						setForm({ ...form, description: e.target.value })
					}
					rows={3}
					placeholder="Brief summary of your role…"
					className="field-input resize-y"
				/>
			</div>

			{/* Achievements */}
			<div className="mb-4">
				<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
					Key Achievements
				</label>
				<div className="flex flex-col gap-2 mb-2">
					{form.achievements.map((a: string, i: number) => (
						<div
							key={i}
							className="flex items-start gap-3 px-3 py-2 rounded-lg"
							style={{
								background: "rgba(139,92,246,.06)",
								border: "1px solid rgba(139,92,246,.15)",
							}}
						>
							<span
								className="font-mono text-xs"
								style={{
									color: "rgba(139,92,246,.5)",
									marginTop: 1,
									flexShrink: 0,
								}}
							>
								{String(i + 1).padStart(2, "0")}
							</span>
							<span
								className="font-mono text-xs flex-1"
								style={{
									color: "rgba(200,190,240,.7)",
									lineHeight: 1.6,
								}}
							>
								{a}
							</span>
							<button
								onClick={() =>
									setForm({
										...form,
										achievements: form.achievements.filter(
											(_: any, j: number) => j !== i,
										),
									})
								}
								style={{
									background: "none",
									border: "none",
									color: "rgba(239,68,68,.6)",
									cursor: "pointer",
									fontSize: 16,
								}}
							>
								×
							</button>
						</div>
					))}
				</div>
				<div className="flex gap-2">
					<input
						value={achInput}
						onChange={(e) => setAchInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && addAch()}
						placeholder="Add achievement…"
						className="field-input flex-1"
					/>
					<button
						onClick={addAch}
						className="btn-ghost font-mono text-xs rounded-lg px-3 py-2"
						style={{ cursor: "pointer", whiteSpace: "nowrap" }}
					>
						+ Add
					</button>
				</div>
			</div>

			{/* Tags */}
			<div className="mb-5">
				<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
					Tech / Skills Used
				</label>
				<div className="flex flex-wrap gap-2 mb-2">
					{form.tags.map((tag: string, i: number) => (
						<span
							key={i}
							className="tag-badge flex items-center gap-2"
						>
							{tag}
							<button
								onClick={() =>
									setForm({
										...form,
										tags: form.tags.filter(
											(_: any, j: number) => j !== i,
										),
									})
								}
								style={{
									background: "none",
									border: "none",
									color: "rgba(239,68,68,.7)",
									cursor: "pointer",
								}}
							>
								×
							</button>
						</span>
					))}
				</div>
				<div className="flex gap-2">
					<input
						value={tagInput}
						onChange={(e) => setTagInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && addTag()}
						placeholder="Add tech…"
						className="field-input flex-1"
					/>
					<button
						onClick={addTag}
						className="btn-ghost font-mono text-xs rounded-lg px-3 py-2"
						style={{ cursor: "pointer", whiteSpace: "nowrap" }}
					>
						+ Add
					</button>
				</div>
			</div>

			<div className="flex gap-3">
				<button
					onClick={() => onSave(form)}
					className="btn-primary font-mono text-xs text-white rounded-lg px-6 py-2"
					style={{ cursor: "pointer", border: "none" }}
				>
					Save ✓
				</button>
				<button
					onClick={onCancel}
					className="btn-muted font-mono text-xs rounded-lg px-6 py-2"
					style={{ cursor: "pointer", border: "none" }}
				>
					Cancel
				</button>
			</div>
		</Glass>
	);
}

export default function AdminExperience({
	data,
	setData,
}: {
	data: any;
	setData: (fn: (d: any) => any) => void;
}) {
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);

	const experiences: any[] = data.experience ?? [];

	const openNew = () => {
		setEditingId(null);
		setShowForm(true);
	};
	const openEdit = (id: number) => {
		setEditingId(id);
		setShowForm(true);
	};

	const handleSave = (form: any) => {
		const entry = { ...form, id: editingId ?? Date.now() };
		setData((d: any) => ({
			...d,
			experience: editingId
				? d.experience.map((e: any) => (e.id === editingId ? entry : e))
				: [...(d.experience ?? []), entry],
		}));
		setShowForm(false);
	};

	const del = (id: number) =>
		setData((d: any) => ({
			...d,
			experience: d.experience.filter((e: any) => e.id !== id),
		}));

	const editing = editingId
		? experiences.find((e) => e.id === editingId)
		: null;

	return (
		<div>
			<div className="flex justify-end mb-4 sm:mb-5">
				<button
					onClick={openNew}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-4 sm:px-5 py-2"
					style={{ cursor: "pointer", border: "none" }}
				>
					+ New Experience
				</button>
			</div>

			{showForm && (
				<ExpForm
					initial={editing ?? { ...blankExp }}
					onSave={handleSave}
					onCancel={() => setShowForm(false)}
				/>
			)}

			<div className="flex flex-col gap-2 sm:gap-3">
				{experiences.map((exp) => (
					<Glass key={exp.id} className="px-4 sm:px-5 py-3 sm:py-4">
						<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2 flex-wrap">
									<span className="font-syne font-semibold text-sm sm:text-base text-white truncate">
										{exp.role}
									</span>
									{exp.current && (
										<span
											className="font-mono text-xs"
											style={{
												color: "rgba(16,185,129,.8)",
											}}
										>
											● Current
										</span>
									)}
								</div>
								<div
									className="font-mono text-xs mt-0.5 flex gap-3 flex-wrap"
									style={{ color: "rgba(200,190,240,.4)" }}
								>
									<span>{exp.company}</span>
									{exp.duration && (
										<span>· {exp.duration}</span>
									)}
									{exp.type && <span>· {exp.type}</span>}
								</div>
							</div>
							<div className="flex gap-2">
								<button
									onClick={() => openEdit(exp.id)}
									className="btn-ghost font-mono text-xs rounded-lg px-3 py-1"
									style={{ cursor: "pointer" }}
								>
									Edit
								</button>
								<button
									onClick={() => del(exp.id)}
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
					</Glass>
				))}

				{experiences.length === 0 && !showForm && (
					<p
						className="font-mono text-xs text-center py-8"
						style={{ color: "rgba(200,190,240,.25)" }}
					>
						No experience entries yet. Click + New Experience to add
						one.
					</p>
				)}
			</div>
		</div>
	);
}
