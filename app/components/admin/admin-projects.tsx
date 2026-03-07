import { useState } from "react";
import { Glass } from "..";
import AdminField from "./admin-field";

export default function AdminProjects({ data, setData }) {
	const blank = {
		id: Date.now(),
		title: "",
		description: "",
		image: null,
		tags: [],
		github: "",
		live: "",
		visible: true,
	};
	const [editing, setEditing] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState(blank);
	const [tagInput, setTagInput] = useState("");

	const openEdit = (p) => {
		setForm({ ...p });
		setEditing(p.id);
		setShowForm(true);
	};
	const openNew = () => {
		setForm({ ...blank, id: Date.now() });
		setEditing(null);
		setShowForm(true);
	};
	const save = () => {
		editing
			? setData((d) => ({
					...d,
					projects: d.projects.map((p) =>
						p.id === editing ? form : p,
					),
				}))
			: setData((d) => ({ ...d, projects: [...d.projects, form] }));
		setShowForm(false);
	};
	const del = (id) =>
		setData((d) => ({
			...d,
			projects: d.projects.filter((p) => p.id !== id),
		}));
	const toggle = (id) =>
		setData((d) => ({
			...d,
			projects: d.projects.map((p) =>
				p.id === id ? { ...p, visible: !p.visible } : p,
			),
		}));

	return (
		<div>
			<div className="flex justify-end mb-4 sm:mb-5">
				<button
					onClick={openNew}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-4 sm:px-5 py-2"
					style={{ cursor: "pointer", border: "none" }}
				>
					+ New Project
				</button>
			</div>

			{showForm && (
				<Glass className="p-5 sm:p-6 md:p-8 mb-5 sm:mb-6">
					<h3 className="font-syne font-bold text-white text-base sm:text-lg mb-4 sm:mb-6">
						{editing ? "Edit Project" : "New Project"}
					</h3>
					{/* 1-col on mobile, 2-col on sm+ */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
						<AdminField
							label="Title"
							value={form.title}
							onChange={(v) => setForm({ ...form, title: v })}
						/>
						<AdminField
							label="Image URL"
							value={form.image || ""}
							onChange={(v) =>
								setForm({ ...form, image: v || null })
							}
						/>
						<AdminField
							label="GitHub URL"
							value={form.github}
							onChange={(v) => setForm({ ...form, github: v })}
						/>
						<AdminField
							label="Live URL"
							value={form.live}
							onChange={(v) => setForm({ ...form, live: v })}
						/>
					</div>
					<div className="mb-3 sm:mb-4">
						<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
							Description
						</label>
						<textarea
							value={form.description}
							onChange={(e) =>
								setForm({
									...form,
									description: e.target.value,
								})
							}
							rows={3}
							className="field-input resize-y"
						/>
					</div>
					<div className="mb-4 sm:mb-6">
						<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
							Tags
						</label>
						<div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
							{form.tags.map((tag, i) => (
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
													(_, j) => j !== i,
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
						<div className="flex gap-2 sm:gap-3">
							<input
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								placeholder="Add tag…"
								className="field-input flex-1"
							/>
							<button
								onClick={() => {
									if (tagInput.trim()) {
										setForm({
											...form,
											tags: [
												...form.tags,
												tagInput.trim(),
											],
										});
										setTagInput("");
									}
								}}
								className="btn-ghost font-mono text-xs rounded-lg px-3 sm:px-4 py-2"
								style={{
									cursor: "pointer",
									whiteSpace: "nowrap",
								}}
							>
								+ Add
							</button>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 sm:gap-3">
						<button
							onClick={save}
							className="btn-primary font-mono text-xs text-white rounded-lg px-5 sm:px-6 py-2"
							style={{ cursor: "pointer", border: "none" }}
						>
							Save ✓
						</button>
						<button
							onClick={() => setShowForm(false)}
							className="btn-muted font-mono text-xs rounded-lg px-5 sm:px-6 py-2"
							style={{ cursor: "pointer", border: "none" }}
						>
							Cancel
						</button>
					</div>
				</Glass>
			)}

			<div className="flex flex-col gap-2 sm:gap-3">
				{data.projects.map((p) => (
					<Glass
						key={p.id}
						className="px-4 sm:px-5 md:px-6 py-3 sm:py-4"
					>
						{/* Stack on mobile, row on sm+ */}
						<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
							<div className="flex-1 min-w-0">
								<div
									className="font-syne font-semibold text-sm sm:text-base truncate"
									style={{
										color: p.visible
											? "#fff"
											: "rgba(200,190,240,.4)",
									}}
								>
									{p.title}
								</div>
								<div
									className="font-mono text-xs mt-0.5 sm:mt-1 truncate"
									style={{ color: "rgba(200,190,240,.4)" }}
								>
									{p.tags.join(", ")}
								</div>
							</div>
							<div className="flex flex-wrap gap-2">
								<button
									onClick={() => toggle(p.id)}
									className={`font-mono text-xs rounded-lg px-3 py-1 ${p.visible ? "btn-success" : "btn-muted"}`}
									style={{ cursor: "pointer" }}
								>
									{p.visible ? "Visible" : "Hidden"}
								</button>
								<button
									onClick={() => openEdit(p)}
									className="btn-ghost font-mono text-xs rounded-lg px-3 py-1"
									style={{ cursor: "pointer" }}
								>
									Edit
								</button>
								<button
									onClick={() => del(p.id)}
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
			</div>
		</div>
	);
}
