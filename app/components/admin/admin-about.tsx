import { useState } from "react";
import { Glass } from "..";
import AdminField from "./admin-field";

export default function AdminAbout({ data, setData }) {
	const [form, setForm] = useState({ ...data.about });
	const [skillInput, setSkillInput] = useState("");
	const [saved, setSaved] = useState(false);
	const save = () => {
		setData((d) => ({ ...d, about: form }));
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	return (
		<Glass className="p-5 sm:p-7 md:p-9">
			<h3 className="font-syne font-bold text-white text-lg sm:text-xl mb-5 sm:mb-7">
				Edit About
			</h3>

			{/* 1-col on mobile, 2-col on sm+ */}
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

			<div className="mb-4 sm:mb-5">
				<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
					Bio
				</label>
				<textarea
					value={form.bio}
					onChange={(e) => setForm({ ...form, bio: e.target.value })}
					rows={3}
					className="field-input resize-y"
				/>
			</div>

			{/* Toggle */}
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

			{/* Skills */}
			<div className="mb-5 sm:mb-7">
				<label className="block font-mono text-xs uppercase tracking-widest mb-2 sm:mb-3 text-purple-400">
					Skills
				</label>
				<div className="flex flex-wrap gap-2 mb-3">
					{form.skills.map((s, i) => (
						<div
							key={i}
							className="tag-badge flex items-center gap-2"
						>
							<span
								className="font-mono text-xs"
								style={{ color: "rgba(200,190,240,.8)" }}
							>
								{s.name}
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
								className="w-10 font-mono text-xs text-purple-400 outline-none"
								style={{
									background: "transparent",
									border: "none",
								}}
							/>
							<button
								onClick={() =>
									setForm({
										...form,
										skills: form.skills.filter(
											(_, j) => j !== i,
										),
									})
								}
								className="text-red-400 font-mono"
								style={{
									background: "none",
									border: "none",
									fontSize: 14,
									cursor: "pointer",
								}}
							>
								×
							</button>
						</div>
					))}
				</div>
				<div className="flex gap-2 sm:gap-3">
					<input
						value={skillInput}
						onChange={(e) => setSkillInput(e.target.value)}
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
										{ name: skillInput.trim(), level: 70 },
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
