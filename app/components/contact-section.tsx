import { useState } from "react";
import { Glass, SectionTitle } from ".";

export default function ContactPage({ onNewMessage }) {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [sent, setSent] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.message) return;
		onNewMessage({
			...form,
			id: Date.now(),
			date: new Date().toISOString().slice(0, 10),
		});
		setSent(true);
		setForm({ name: "", email: "", message: "" });
	};

	return (
		<div className="min-h-screen pt-36 pb-20 px-10 max-w-2xl mx-auto">
			<SectionTitle label="003" title="Get In Touch" />
			<Glass className="p-12 mt-12">
				{sent ? (
					<div className="text-center py-10">
						<div className="text-5xl mb-5">✨</div>
						<h3 className="font-syne font-bold text-white text-2xl mb-3">
							Message Sent!
						</h3>
						<p
							className="font-mono text-sm"
							style={{ color: "rgba(200,190,240,.6)" }}
						>
							I'll get back to you soon.
						</p>
						<button
							onClick={() => setSent(false)}
							className="btn-ghost font-mono text-xs rounded-lg px-5 py-2 mt-6"
							style={{ cursor: "pointer" }}
						>
							Send Another
						</button>
					</div>
				) : (
					<form onSubmit={submit} className="flex flex-col gap-5">
						{[
							{
								key: "name",
								label: "Name",
								type: "text",
								ph: "Your name",
							},
							{
								key: "email",
								label: "Email",
								type: "email",
								ph: "your@email.com",
							},
						].map(({ key, label, type, ph }) => (
							<div key={key}>
								<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
									{label}
								</label>
								<input
									type={type}
									value={form[key]}
									onChange={(e) =>
										setForm({
											...form,
											[key]: e.target.value,
										})
									}
									placeholder={ph}
									className="field-input"
								/>
							</div>
						))}
						<div>
							<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
								Message
							</label>
							<textarea
								value={form.message}
								onChange={(e) =>
									setForm({
										...form,
										message: e.target.value,
									})
								}
								placeholder="Tell me about your project…"
								rows={5}
								className="field-input resize-y"
							/>
						</div>
						<button
							type="submit"
							className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-4 mt-1"
							style={{ cursor: "pointer", border: "none" }}
						>
							Send Message →
						</button>
					</form>
				)}
			</Glass>
		</div>
	);
}
