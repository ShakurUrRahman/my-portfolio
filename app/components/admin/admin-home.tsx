// "use client";

// import { Glass } from "..";

// function Field({
// 	label,
// 	value,
// 	onChange,
// 	placeholder = "",
// }: {
// 	label: string;
// 	value: string;
// 	onChange: (v: string) => void;
// 	placeholder?: string;
// }) {
// 	return (
// 		<div>
// 			<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
// 				{label}
// 			</label>
// 			<input
// 				value={value}
// 				onChange={(e) => onChange(e.target.value)}
// 				placeholder={placeholder}
// 				className="field-input"
// 			/>
// 		</div>
// 	);
// }

// function Textarea({
// 	label,
// 	value,
// 	onChange,
// 	placeholder = "",
// }: {
// 	label: string;
// 	value: string;
// 	onChange: (v: string) => void;
// 	placeholder?: string;
// }) {
// 	return (
// 		<div>
// 			<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
// 				{label}
// 			</label>
// 			<textarea
// 				value={value}
// 				onChange={(e) => onChange(e.target.value)}
// 				placeholder={placeholder}
// 				rows={3}
// 				className="field-input resize-y"
// 			/>
// 		</div>
// 	);
// }

// export default function AdminHome({
// 	data,
// 	setData,
// }: {
// 	data: any;
// 	setData: (fn: (d: any) => any) => void;
// }) {
// 	const home = data.home;

// 	const update = (key: string, value: any) =>
// 		setData((d: any) => ({ ...d, home: { ...d.home, [key]: value } }));

// 	const updateCta = (
// 		ctaKey: "ctaPrimary" | "ctaSecondary",
// 		field: string,
// 		value: any,
// 	) =>
// 		setData((d: any) => ({
// 			...d,
// 			home: {
// 				...d.home,
// 				[ctaKey]: { ...d.home[ctaKey], [field]: value },
// 			},
// 		}));

// 	return (
// 		<div className="flex flex-col gap-5">
// 			{/* ── Hero Text ── */}
// 			<Glass className="p-5 sm:p-7">
// 				<p
// 					className="font-mono text-xs uppercase tracking-widest mb-5"
// 					style={{ color: "rgba(139,92,246,.5)" }}
// 				>
// 					Hero Text
// 				</p>
// 				<div className="flex flex-col gap-4">
// 					<Field
// 						label="Greeting Line"
// 						value={home?.greeting}
// 						onChange={(v) => update("greeting", v)}
// 						placeholder="Hello, I'm"
// 					/>
// 					<Field
// 						label="Your Name"
// 						value={home?.name}
// 						onChange={(v) => update("name", v)}
// 						placeholder="Shakurur Rahman"
// 					/>
// 					<Textarea
// 						label="Main Tagline"
// 						value={home?.tagline}
// 						onChange={(v) => update("tagline", v)}
// 						placeholder="I build fast, beautiful web experiences."
// 					/>
// 					<Textarea
// 						label="Sub Tagline"
// 						value={home?.subTagline}
// 						onChange={(v) => update("subTagline", v)}
// 						placeholder="Junior Web Developer specializing in..."
// 					/>
// 					<Field
// 						label="Available Badge Text"
// 						value={home?.badge}
// 						onChange={(v) => update("badge", v)}
// 						placeholder="Available for work"
// 					/>
// 				</div>
// 			</Glass>

// 			{/* ── CTA Buttons ── */}
// 			<Glass className="p-5 sm:p-7">
// 				<p
// 					className="font-mono text-xs uppercase tracking-widest mb-5"
// 					style={{ color: "rgba(139,92,246,.5)" }}
// 				>
// 					Call-to-Action Buttons
// 				</p>
// 				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
// 					{/* Primary CTA */}
// 					<div className="flex flex-col gap-3">
// 						<p
// 							className="font-mono text-xs"
// 							style={{ color: "rgba(200,190,240,.4)" }}
// 						>
// 							Primary Button
// 						</p>
// 						<Field
// 							label="Label"
// 							value={home?.ctaPrimary.label}
// 							onChange={(v) =>
// 								updateCta("ctaPrimary", "label", v)
// 							}
// 							placeholder="View Projects"
// 						/>
// 						<div>
// 							<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
// 								Scrolls to Section
// 							</label>
// 							<div className="flex gap-2 flex-wrap">
// 								{[
// 									{ index: 0, name: "Home" },
// 									{ index: 1, name: "About" },
// 									{ index: 2, name: "Projects" },
// 									{ index: 3, name: "Contact" },
// 								].map((s) => (
// 									<button
// 										key={s.index}
// 										onClick={() =>
// 											updateCta(
// 												"ctaPrimary",
// 												"section",
// 												s.index,
// 											)
// 										}
// 										className={`font-mono text-xs rounded-lg px-3 py-1.5 ${home?.ctaPrimary.section === s.index ? "btn-success" : "btn-muted"}`}
// 										style={{
// 											cursor: "pointer",
// 											border: "none",
// 										}}
// 									>
// 										{s.index} · {s.name}
// 									</button>
// 								))}
// 							</div>
// 						</div>
// 					</div>

// 					{/* Secondary CTA */}
// 					<div className="flex flex-col gap-3">
// 						<p
// 							className="font-mono text-xs"
// 							style={{ color: "rgba(200,190,240,.4)" }}
// 						>
// 							Secondary Button
// 						</p>
// 						<Field
// 							label="Label"
// 							value={home?.ctaSecondary.label}
// 							onChange={(v) =>
// 								updateCta("ctaSecondary", "label", v)
// 							}
// 							placeholder="Get In Touch"
// 						/>
// 						<div>
// 							<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 text-purple-400">
// 								Scrolls to Section
// 							</label>
// 							<div className="flex gap-2 flex-wrap">
// 								{[
// 									{ index: 0, name: "Home" },
// 									{ index: 1, name: "About" },
// 									{ index: 2, name: "Projects" },
// 									{ index: 3, name: "Contact" },
// 								].map((s) => (
// 									<button
// 										key={s.index}
// 										onClick={() =>
// 											updateCta(
// 												"ctaSecondary",
// 												"section",
// 												s.index,
// 											)
// 										}
// 										className={`font-mono text-xs rounded-lg px-3 py-1.5 ${home.ctaSecondary.section === s.index ? "btn-success" : "btn-muted"}`}
// 										style={{
// 											cursor: "pointer",
// 											border: "none",
// 										}}
// 									>
// 										{s.index} · {s.name}
// 									</button>
// 								))}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</Glass>

// 			{/* ── Live Preview ── */}
// 			<Glass className="p-5 sm:p-7">
// 				<p
// 					className="font-mono text-xs uppercase tracking-widest mb-5"
// 					style={{ color: "rgba(139,92,246,.5)" }}
// 				>
// 					Live Preview
// 				</p>
// 				<div
// 					style={{
// 						background: "rgba(139,92,246,.04)",
// 						border: "1px solid rgba(139,92,246,.12)",
// 						borderRadius: 12,
// 						padding: "32px 28px",
// 					}}
// 				>
// 					{/* Badge */}
// 					{home?.badge && (
// 						<div
// 							className="font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
// 							style={{
// 								background: "rgba(16,185,129,.1)",
// 								border: "1px solid rgba(16,185,129,.25)",
// 								color: "#10b981",
// 							}}
// 						>
// 							<span
// 								style={{
// 									width: 6,
// 									height: 6,
// 									borderRadius: "50%",
// 									background: "#10b981",
// 									display: "inline-block",
// 								}}
// 							/>
// 							{home.badge}
// 						</div>
// 					)}

// 					{/* Greeting + name */}
// 					<p
// 						className="font-mono text-sm mb-1"
// 						style={{ color: "rgba(200,190,240,.5)" }}
// 					>
// 						{home.greeting}
// 					</p>
// 					<h1
// 						className="font-syne font-extrabold text-white mb-3"
// 						style={{
// 							fontSize: "clamp(28px,5vw,48px)",
// 							lineHeight: 1.1,
// 							letterSpacing: "-0.02em",
// 						}}
// 					>
// 						{home.name}
// 					</h1>

// 					{/* Taglines */}
// 					<p
// 						className="font-syne font-bold mb-2"
// 						style={{
// 							fontSize: "clamp(16px,3vw,22px)",
// 							color: "rgba(200,190,240,.85)",
// 						}}
// 					>
// 						{home.tagline}
// 					</p>
// 					<p
// 						className="font-mono text-sm leading-loose mb-6"
// 						style={{ color: "rgba(200,190,240,.5)", maxWidth: 480 }}
// 					>
// 						{home.subTagline}
// 					</p>

// 					{/* CTAs */}
// 					<div className="flex gap-3 flex-wrap">
// 						<span
// 							className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl px-5 py-3 inline-block"
// 							style={{ border: "none" }}
// 						>
// 							{home.ctaPrimary.label} →
// 						</span>
// 						<span className="btn-ghost font-mono text-xs uppercase tracking-widest rounded-xl px-5 py-3 inline-block">
// 							{home.ctaSecondary.label}
// 						</span>
// 					</div>
// 				</div>
// 			</Glass>
// 		</div>
// 	);
// }
