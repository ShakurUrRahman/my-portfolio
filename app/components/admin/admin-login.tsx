"use client";

import { useState } from "react";
import { Glass } from "..";

export default function AdminLogin({ onAuth, onClose }) {
	const [pw, setPw] = useState("");
	const [err, setErr] = useState(false);
	const [loading, setLoading] = useState(false);

	const attempt = async () => {
		if (!pw.trim()) return;
		setLoading(true);
		const res = await fetch("/api/auth", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ password: pw }),
		});
		setLoading(false);
		if (res.ok) {
			setErr(false);
			onAuth();
		} else {
			setErr(true);
			setPw("");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 sm:px-8 relative">
			<button
				onClick={onClose}
				className="btn-logout font-mono text-xs rounded-lg px-4 py-2 absolute right-0 top-0"
				style={{ cursor: "pointer" }}
			>
				✕ Close
			</button>

			<Glass className="p-8 sm:p-10 md:p-12 w-full max-w-xs sm:max-w-sm text-center">
				<div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🔐</div>
				<h2 className="font-syne font-bold text-white text-xl sm:text-2xl mb-6">
					Admin Access
				</h2>
				<input
					type="password"
					value={pw}
					onChange={(e) => {
						setPw(e.target.value);
						setErr(false);
					}}
					onKeyDown={(e) => e.key === "Enter" && attempt()}
					placeholder="Enter password…"
					className="field-input mb-3 sm:mb-4"
				/>
				{err && (
					<p className="font-mono text-xs text-red-400 mb-3">
						Incorrect password.
					</p>
				)}
				<button
					onClick={attempt}
					disabled={loading}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 w-full mb-3 sm:mb-4"
					style={{
						cursor: "pointer",
						border: "none",
						opacity: loading ? 0.6 : 1,
					}}
				>
					{loading ? "Checking..." : "Login →"}
				</button>
				<button
					onClick={onClose}
					className="font-mono text-xs"
					style={{
						background: "none",
						border: "none",
						color: "rgba(139,92,246,.5)",
						cursor: "pointer",
					}}
				>
					← Back to Portfolio
				</button>
			</Glass>
		</div>
	);
}
