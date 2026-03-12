"use client";

import { useState } from "react";
import { Glass } from "..";

function AdminField({
	label,
	value,
	onChange,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div>
			<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
				{label}
			</label>
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="field-input"
			/>
		</div>
	);
}

function AdminTextarea({
	label,
	value,
	onChange,
	rows = 3,
}: {
	label: string;
	value: string;
	onChange: (v: string) => void;
	rows?: number;
}) {
	return (
		<div>
			{/* make sure */}
			<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
				{label}
			</label>
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				rows={rows}
				className="field-input resize-y"
			/>
		</div>
	);
}

const blankProject = {
	id: 0,
	title: "",
	description: "",
	image: null as string | null,
	images: [null, null, null] as (string | null)[],
	tags: [] as string[],
	github: "",
	live: "",
	visible: true,
	role: "",
	duration: "",
	year: new Date().getFullYear().toString(),
	status: "In Progress",
	overview: "",
	howItWorks: [] as string[],
	features: [] as string[],
	challenges: "",
	learnings: "",
};

export default function AdminProjects({
	data,
	setData,
}: {
	data: any;
	setData: (fn: (d: any) => any) => void;
}) {
	const [editing, setEditing] = useState<number | null>(null);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({ ...blankProject });

	// Tag input
	const [tagInput, setTagInput] = useState("");
	// How it works input
	const [stepInput, setStepInput] = useState("");
	// Feature input
	const [featureInput, setFeatureInput] = useState("");

	const openNew = () => {
		setForm({ ...blankProject, id: Date.now() });
		setEditing(null);
		setShowForm(true);
		setTagInput("");
		setStepInput("");
		setFeatureInput("");
	};

	const openEdit = (p: any) => {
		setForm({
			...blankProject,
			...p,
			images: p.images?.length ? p.images : [null, null, null],
			howItWorks: p.howItWorks || [],
			features: p.features || [],
		});
		setEditing(p.id);
		setShowForm(true);
		setTagInput("");
		setStepInput("");
		setFeatureInput("");
	};

	const save = () => {
		if (editing !== null) {
			setData((d: any) => ({
				...d,
				projects: d.projects.map((p: any) =>
					p.id === editing ? form : p,
				),
			}));
		} else {
			setData((d: any) => ({ ...d, projects: [...d.projects, form] }));
		}
		setShowForm(false);
	};

	const del = (id: number) =>
		setData((d: any) => ({
			...d,
			projects: d.projects.filter((p: any) => p.id !== id),
		}));

	const toggle = (id: number) =>
		setData((d: any) => ({
			...d,
			projects: d.projects.map((p: any) =>
				p.id === id ? { ...p, visible: !p.visible } : p,
			),
		}));

	const updateImage = (index: number, url: string) => {
		const imgs = [...form.images] as (string | null)[];
		imgs[index] = url || null;
		setForm({ ...form, images: imgs });
	};

	const addStep = () => {
		if (stepInput.trim()) {
			setForm({
				...form,
				howItWorks: [...form.howItWorks, stepInput.trim()],
			});
			setStepInput("");
		}
	};

	const removeStep = (i: number) =>
		setForm({
			...form,
			howItWorks: form.howItWorks.filter((_, j) => j !== i),
		});

	const addFeature = () => {
		if (featureInput.trim()) {
			setForm({
				...form,
				features: [...form.features, featureInput.trim()],
			});
			setFeatureInput("");
		}
	};

	const removeFeature = (i: number) =>
		setForm({ ...form, features: form.features.filter((_, j) => j !== i) });

	return (
		<div>
			{/* Top bar */}
			<div className="flex justify-end mb-4 sm:mb-5">
				<button
					onClick={openNew}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-4 sm:px-5 py-2"
					style={{ cursor: "pointer", border: "none" }}
				>
					+ New Project
				</button>
			</div>

			{/* ── FORM ── */}
			{showForm && (
				<Glass className="p-5 sm:p-7 mb-5 sm:mb-6">
					<h3 className="font-syne font-bold text-white text-base sm:text-lg mb-5">
						{editing !== null ? "Edit Project" : "New Project"}
					</h3>

					{/* Basic info */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
						<AdminField
							label="Title"
							value={form.title}
							onChange={(v) => setForm({ ...form, title: v })}
						/>
						<AdminField
							label="Role"
							value={form.role}
							onChange={(v) => setForm({ ...form, role: v })}
						/>
						<AdminField
							label="Year"
							value={form.year}
							onChange={(v) => setForm({ ...form, year: v })}
						/>
						<AdminField
							label="Duration"
							value={form.duration}
							onChange={(v) => setForm({ ...form, duration: v })}
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

					{/* Status */}
					<div className="mb-4">
						<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
							Status
						</label>
						<div className="flex gap-3">
							{["Completed", "In Progress"].map((s) => (
								<button
									key={s}
									onClick={() =>
										setForm({ ...form, status: s })
									}
									className={`font-mono text-xs rounded-lg px-4 py-2 ${form.status === s ? "btn-success" : "btn-muted"}`}
									style={{
										cursor: "pointer",
										border: "none",
									}}
								>
									{s}
								</button>
							))}
						</div>
					</div>

					{/* Description */}
					<div className="mb-4">
						<AdminTextarea
							label="Short Description (card)"
							value={form.description}
							onChange={(v) =>
								setForm({ ...form, description: v })
							}
							rows={2}
						/>
					</div>

					{/* Overview */}
					<div className="mb-4">
						<AdminTextarea
							label="Full Overview (drawer)"
							value={form.overview}
							onChange={(v) => setForm({ ...form, overview: v })}
							rows={4}
						/>
					</div>

					{/* Images */}
					<div className="mb-5">
						<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
							Preview Images (3 URLs)
						</label>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
							{[0, 1, 2].map((i) => (
								<div key={i}>
									<label
										className="block font-mono text-xs mb-1"
										style={{
											color: "rgba(200,190,240,.4)",
										}}
									>
										{i === 0
											? "Main (large)"
											: `Image ${i + 1}`}
									</label>
									<input
										value={form.images[i] || ""}
										onChange={(e) =>
											updateImage(i, e.target.value)
										}
										placeholder="https://..."
										className="field-input"
									/>
								</div>
							))}
						</div>
					</div>

					{/* Tags */}
					<div className="mb-5">
						<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
							Tags
						</label>
						<div className="flex flex-wrap gap-2 mb-2">
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
						<div className="flex gap-2">
							<input
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && tagInput.trim()) {
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
								className="btn-ghost font-mono text-xs rounded-lg px-3 py-2"
								style={{
									cursor: "pointer",
									whiteSpace: "nowrap",
								}}
							>
								+ Add
							</button>
						</div>
					</div>

					{/* How It Works */}
					<div className="mb-5">
						<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
							How It Works (steps)
						</label>
						<div className="flex flex-col gap-2 mb-3">
							{form.howItWorks.map((step, i) => (
								<div
									key={i}
									className="flex items-start gap-3"
									style={{
										background: "rgba(139,92,246,.06)",
										border: "1px solid rgba(139,92,246,.15)",
										borderRadius: 8,
										padding: "10px 14px",
									}}
								>
									<span
										className="font-mono text-xs"
										style={{
											color: "rgba(139,92,246,.6)",
											flexShrink: 0,
											marginTop: 1,
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
										{step}
									</span>
									<button
										onClick={() => removeStep(i)}
										style={{
											background: "none",
											border: "none",
											color: "rgba(239,68,68,.6)",
											cursor: "pointer",
											flexShrink: 0,
										}}
									>
										×
									</button>
								</div>
							))}
						</div>
						<div className="flex gap-2">
							<input
								value={stepInput}
								onChange={(e) => setStepInput(e.target.value)}
								onKeyDown={(e) =>
									e.key === "Enter" && addStep()
								}
								placeholder="Describe a step…"
								className="field-input flex-1"
							/>
							<button
								onClick={addStep}
								className="btn-ghost font-mono text-xs rounded-lg px-3 py-2"
								style={{
									cursor: "pointer",
									whiteSpace: "nowrap",
								}}
							>
								+ Add
							</button>
						</div>
					</div>

					{/* Key Features */}
					<div className="mb-5">
						<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
							Key Features
						</label>
						<div className="flex flex-wrap gap-2 mb-3">
							{form.features.map((f, i) => (
								<span
									key={i}
									className="flex items-center gap-2"
									style={{
										background: "rgba(6,182,212,.08)",
										border: "1px solid rgba(6,182,212,.2)",
										borderRadius: 8,
										padding: "6px 12px",
										color: "rgba(6,182,212,.85)",
										fontSize: 12,
										fontFamily: "'DM Mono', monospace",
									}}
								>
									{f}
									<button
										onClick={() => removeFeature(i)}
										style={{
											background: "none",
											border: "none",
											color: "rgba(239,68,68,.6)",
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
								value={featureInput}
								onChange={(e) =>
									setFeatureInput(e.target.value)
								}
								onKeyDown={(e) =>
									e.key === "Enter" && addFeature()
								}
								placeholder="Add a feature…"
								className="field-input flex-1"
							/>
							<button
								onClick={addFeature}
								className="btn-ghost font-mono text-xs rounded-lg px-3 py-2"
								style={{
									cursor: "pointer",
									whiteSpace: "nowrap",
								}}
							>
								+ Add
							</button>
						</div>
					</div>

					{/* Challenges & Learnings */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
						<AdminTextarea
							label="Challenges"
							value={form.challenges}
							onChange={(v) =>
								setForm({ ...form, challenges: v })
							}
							rows={4}
						/>
						<AdminTextarea
							label="Learnings"
							value={form.learnings}
							onChange={(v) => setForm({ ...form, learnings: v })}
							rows={4}
						/>
					</div>

					{/* Actions */}
					<div className="flex flex-wrap gap-3">
						<button
							onClick={save}
							className="btn-primary font-mono text-xs text-white rounded-lg px-6 py-2"
							style={{ cursor: "pointer", border: "none" }}
						>
							Save ✓
						</button>
						<button
							onClick={() => setShowForm(false)}
							className="btn-muted font-mono text-xs rounded-lg px-6 py-2"
							style={{ cursor: "pointer", border: "none" }}
						>
							Cancel
						</button>
					</div>
				</Glass>
			)}

			{/* ── Project List ── */}
			<div className="flex flex-col gap-2 sm:gap-3">
				{data.projects.map((p: any) => (
					<Glass
						key={p.id}
						className="px-4 sm:px-5 md:px-6 py-3 sm:py-4"
					>
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
									className="font-mono text-xs mt-0.5 sm:mt-1 flex gap-3"
									style={{ color: "rgba(200,190,240,.4)" }}
								>
									<span>{p.tags?.join(", ")}</span>
									{p.year && <span>· {p.year}</span>}
									{p.status && <span>· {p.status}</span>}
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
