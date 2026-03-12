"use client";

import { useState } from "react";
import { Glass } from "..";

export default function AdminHome({ data, setData }) {
	const [form, setForm] = useState({
		shortName: data.home?.shortName ?? "",
		title: data.home?.title ?? "",
		description: data.home?.description ?? "",
	});
	const [saved, setSaved] = useState(false);

	const save = () => {
		setData((d) => ({ ...d, home: form }));
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	return (
		<Glass className="p-5 sm:p-7 md:p-9">
			<h3 className="font-syne font-bold text-white text-lg sm:text-xl mb-5 sm:mb-7">
				Edit Home
			</h3>

			<div className="flex flex-col gap-4 sm:gap-5 mb-5 sm:mb-7">
				{/* Short Name */}
				<div>
					<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
						Short Name
					</label>
					<input
						value={form.shortName}
						onChange={(e) =>
							setForm({ ...form, shortName: e.target.value })
						}
						placeholder="e.g. SR"
						className="field-input"
					/>
					<p
						className="font-mono text-xs mt-1.5"
						style={{ color: "rgba(200,190,240,.35)" }}
					>
						Displayed as the logo / hero initials
					</p>
				</div>

				{/* Title */}
				<div>
					<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
						Title
					</label>
					<input
						value={form.title}
						onChange={(e) =>
							setForm({ ...form, title: e.target.value })
						}
						placeholder="e.g. Full Stack Developer"
						className="field-input"
					/>
					<p
						className="font-mono text-xs mt-1.5"
						style={{ color: "rgba(200,190,240,.35)" }}
					>
						Your headline shown below the name
					</p>
				</div>

				{/* Description */}
				<div>
					<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
						Description
					</label>
					<textarea
						value={form.description}
						onChange={(e) =>
							setForm({ ...form, description: e.target.value })
						}
						rows={4}
						placeholder="A short intro paragraph…"
						className="field-input resize-y"
					/>
					<p
						className="font-mono text-xs mt-1.5"
						style={{ color: "rgba(200,190,240,.35)" }}
					>
						Short intro displayed on the hero section
					</p>
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
