import { useState } from "react";
import { Glass, SectionTitle } from ".";

export default function ContactSection({
	onNewMessage,
	onFieldFocus,
	onFieldBlur,
}) {
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
		<div
			className="min-h-screen
      pt-24 sm:pt-28 md:pt-32 lg:pt-36
      pb-12 sm:pb-16 md:pb-20
      px-4 sm:px-6 md:px-10
      max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl
      mx-auto"
		>
			<SectionTitle label="003" title="Get In Touch" />

			<Glass className="p-6 sm:p-8 md:p-10 lg:p-12 mt-8 sm:mt-10 md:mt-12">
				{sent ? (
					<div className="text-center py-6 sm:py-10">
						<div className="text-4xl sm:text-5xl mb-4 sm:mb-5">
							✨
						</div>
						<h3 className="font-syne font-bold text-white text-xl sm:text-2xl mb-2 sm:mb-3">
							Message Sent!
						</h3>
						<p
							className="font-mono text-xs sm:text-sm"
							style={{ color: "rgba(200,190,240,.6)" }}
						>
							I'll get back to you soon.
						</p>
						<button
							onClick={() => setSent(false)}
							className="btn-ghost font-mono text-xs rounded-lg px-4 sm:px-5 py-2 mt-5 sm:mt-6"
							style={{ cursor: "pointer" }}
						>
							Send Another
						</button>
					</div>
				) : (
					<form
						onSubmit={submit}
						className="flex flex-col gap-4 sm:gap-5"
					>
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
								<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
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
									onFocus={onFieldFocus}
									onBlur={onFieldBlur}
									placeholder={ph}
									className="field-input"
								/>
							</div>
						))}
						<div>
							<label className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400">
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
								onFocus={onFieldFocus}
								onBlur={onFieldBlur}
								placeholder="Tell me about your project…"
								rows={4}
								className="field-input resize-y"
							/>
						</div>
						<button
							type="submit"
							className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 sm:py-4 mt-1"
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
