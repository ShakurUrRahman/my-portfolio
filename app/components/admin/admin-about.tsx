"use client";

import { useState, useRef } from "react";
import { Glass } from "..";
import AdminField from "./admin-field";

export default function AdminAbout({ data, setData }) {
	const [form, setForm] = useState({ ...data.about });
	const [skillInput, setSkillInput] = useState("");
	const [saved, setSaved] = useState(false);

	const dragIndex = useRef<number | null>(null);

	const save = () => {
		setData((d) => ({ ...d, about: form }));
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const updateSocial = (key: string, value: string) =>
		setForm({ ...form, socials: { ...form.socials, [key]: value } });

	const onDragStart = (i: number) => {
		dragIndex.current = i;
	};

	const onDragEnter = (i: number) => {
		if (dragIndex.current === null || dragIndex.current === i) return;
		const skills = [...form.skills];
		const dragged = skills.splice(dragIndex.current, 1)[0];
		skills.splice(i, 0, dragged);
		dragIndex.current = i;
		setForm((f) => ({ ...f, skills }));
	};

	const onDragEnd = () => {
		dragIndex.current = null;
	};

	return (
		<Glass className="p-5 sm:p-7 md:p-9">
			<h3 className="font-syne font-bold text-white text-lg sm:text-xl mb-5 sm:mb-7">
				Edit About
			</h3>

			{/* Name + Role */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
				<AdminField
					label="Name"
					value={form.name}
					onChange={(v) => setForm({ ...form, name: v })}
				/>
				<AdminField
					label="Role"
					value={form.role}
					onChange={(v) => setForm({ ...form, role: v })}
				/>
			</div>

			{/* Bio */}
			<div className="mb-4 sm:mb-5">
				<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
					Bio
				</label>
				<textarea
					value={form.bio}
					onChange={(e) => setForm({ ...form, bio: e.target.value })}
					rows={3}
					className="field-input resize-y sm:h-48"
				/>
			</div>

			{/* Available toggle */}
			<div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
				<label className="font-mono text-xs uppercase tracking-widest text-purple-400">
					Available for Work
				</label>
				<div
					onClick={() =>
						setForm({ ...form, available: !form.available })
					}
					className={`w-11 h-6 rounded-full relative transition-all duration-300 border ${form.available ? "toggle-on" : "toggle-off"}`}
					style={{
						cursor: "pointer",
						borderColor: "rgba(255,255,255,.1)",
					}}
				>
					<div
						className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300"
						style={{ left: form.available ? "22px" : "2px" }}
					/>
				</div>
			</div>

			{/* Socials */}
			<div className="mb-5 sm:mb-7">
				<label className="block font-mono text-xs uppercase tracking-widest mb-2 sm:mb-3 text-purple-400">
					Social Links
				</label>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{[
						{
							key: "github",
							label: "⚡ GitHub",
							ph: "https://github.com/…",
						},
						{
							key: "linkedin",
							label: "🔗 LinkedIn",
							ph: "https://linkedin.com/in/…",
						},
						{
							key: "twitter",
							label: "🐦 Twitter",
							ph: "https://twitter.com/…",
						},
					].map(({ key, label, ph }) => (
						<div key={key}>
							<label
								className="block font-mono text-xs mb-1.5"
								style={{ color: "rgba(200,190,240,.45)" }}
							>
								{label}
							</label>
							<input
								value={form.socials?.[key] ?? ""}
								onChange={(e) =>
									updateSocial(key, e.target.value)
								}
								placeholder={ph}
								className="field-input"
							/>
						</div>
					))}
				</div>
			</div>

			{/* Skills */}
			<div className="mb-5 sm:mb-7">
				<div className="flex items-center justify-between mb-2 sm:mb-3">
					<label className="font-mono text-xs uppercase tracking-widest text-purple-400">
						Skills
					</label>
					<span
						className="font-mono text-xs"
						style={{ color: "rgba(200,190,240,.3)" }}
					>
						hold ⠿ to reorder
					</span>
				</div>

				<div className="flex flex-col gap-2 mb-3">
					{form.skills.map((s, i) => (
						<div
							key={i}
							draggable
							onDragStart={() => onDragStart(i)}
							onDragEnter={() => onDragEnter(i)}
							onDragEnd={onDragEnd}
							onDragOver={(e) => e.preventDefault()}
							className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-opacity duration-150"
							style={{
								background: "rgba(139,92,246,.06)",
								border: "1px solid rgba(139,92,246,.15)",
							}}
						>
							{/* Drag handle */}
							<span
								className="flex-shrink-0 select-none text-lg leading-none"
								style={{
									color: "rgba(139,92,246,.4)",
									cursor: "grab",
								}}
							>
								⠿
							</span>

							{/* Visibility toggle */}
							<div
								onClick={() => {
									const sk = [...form.skills];
									sk[i] = { ...sk[i], hidden: !sk[i].hidden };
									setForm({ ...form, skills: sk });
								}}
								className={`w-8 h-4 rounded-full relative transition-all duration-300 flex-shrink-0 border ${!s.hidden ? "toggle-on" : "toggle-off"}`}
								style={{
									cursor: "pointer",
									borderColor: "rgba(255,255,255,.1)",
								}}
								title={s.hidden ? "Hidden" : "Visible"}
							>
								<div
									className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-300"
									style={{ left: !s.hidden ? "14px" : "2px" }}
								/>
							</div>

							{/* Name */}
							<span
								className="font-mono text-xs flex-1 truncate"
								style={{
									color: s.hidden
										? "rgba(200,190,240,.3)"
										: "rgba(200,190,240,.8)",
								}}
							>
								{s.name}
							</span>

							{/* Level */}
							<div className="flex items-center gap-1.5 flex-shrink-0">
								<span
									className="font-mono text-xs"
									style={{ color: "rgba(139,92,246,.5)" }}
								>
									Lvl
								</span>
								<input
									type="number"
									min={0}
									max={100}
									value={s.level}
									onChange={(e) => {
										const sk = [...form.skills];
										sk[i] = {
											...sk[i],
											level: +e.target.value,
										};
										setForm({ ...form, skills: sk });
									}}
									onMouseDown={(e) => e.stopPropagation()}
									className="w-12 font-mono text-xs text-purple-400 outline-none text-center rounded-md px-1 py-0.5"
									style={{
										background: "rgba(139,92,246,.1)",
										border: "1px solid rgba(139,92,246,.2)",
									}}
								/>
							</div>

							{/* Delete */}
							<button
								onClick={() =>
									setForm({
										...form,
										skills: form.skills.filter(
											(_, j) => j !== i,
										),
									})
								}
								className="flex-shrink-0 font-mono text-lg leading-none"
								style={{
									background: "none",
									border: "none",
									color: "rgba(239,68,68,.6)",
									cursor: "pointer",
								}}
							>
								×
							</button>
						</div>
					))}
				</div>

				{/* Add skill */}
				<div className="flex gap-2 sm:gap-3">
					<input
						value={skillInput}
						onChange={(e) => setSkillInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter" && skillInput.trim()) {
								setForm({
									...form,
									skills: [
										...form.skills,
										{
											name: skillInput.trim(),
											level: 70,
											hidden: false,
										},
									],
								});
								setSkillInput("");
							}
						}}
						placeholder="Add skill…"
						className="field-input flex-1"
					/>
					<button
						onClick={() => {
							if (skillInput.trim()) {
								setForm({
									...form,
									skills: [
										...form.skills,
										{
											name: skillInput.trim(),
											level: 70,
											hidden: false,
										},
									],
								});
								setSkillInput("");
							}
						}}
						className="btn-ghost font-mono text-xs rounded-lg px-3 sm:px-4 py-2"
						style={{ cursor: "pointer", whiteSpace: "nowrap" }}
					>
						+ Add
					</button>
				</div>
			</div>

			<button
				onClick={save}
				className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-6 sm:px-8 py-2.5 sm:py-3 w-full sm:w-auto"
				style={{ cursor: "pointer", border: "none" }}
			>
				{saved ? "Saved ✓" : "Save Changes"}
			</button>
		</Glass>
	);
}
