"use client";

import { useState } from "react";
import { Glass, SectionTitle } from ".";

export default function ContactSection({
	onNewMessage,
	onFieldFocus,
	onFieldBlur,
}) {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.message) return;
		setError("");
		setLoading(true); // ← add

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || "Failed to send.");
				return;
			}

			onNewMessage({
				...form,
				id: Date.now(),
				date: new Date().toISOString().slice(0, 10),
			});

			setSent(true);
			setForm({ name: "", email: "", message: "" });
		} catch (err) {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false); // ← add
		}
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
							disabled={loading}
							className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 sm:py-4 mt-1 flex items-center justify-center gap-2"
							style={{
								cursor: loading ? "not-allowed" : "pointer",
								border: "none",
								opacity: loading ? 0.7 : 1,
							}}
						>
							{loading ? (
								<>
									{/* Spinner */}
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										style={{
											animation:
												"spin 1s linear infinite",
										}}
									>
										<circle
											cx="12"
											cy="12"
											r="10"
											strokeOpacity="0.25"
										/>
										<path
											d="M12 2a10 10 0 0 1 10 10"
											strokeLinecap="round"
										/>
									</svg>
									Sending...
								</>
							) : (
								<>Send Message →</>
							)}
						</button>
						{error && (
							<p className="font-mono text-xs text-red-400 text-center mt-2">
								{error}
							</p>
						)}
					</form>
				)}
			</Glass>
		</div>
	);
}
