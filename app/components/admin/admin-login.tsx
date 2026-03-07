import { useState } from "react";
import { Glass } from "..";

export default function AdminLogin({ onAuth, setPage }) {
	const [pw, setPw] = useState(""),
		[err, setErr] = useState(false);
	const attempt = () => {
		pw === "admin123" ? (setErr(false), onAuth()) : setErr(true);
	};
	return (
		<div className="min-h-screen flex items-center justify-center px-4 sm:px-8">
			<Glass className="p-8 sm:p-10 md:p-12 w-full max-w-xs sm:max-w-sm text-center">
				<div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🔐</div>
				<h2 className="font-syne font-bold text-white text-xl sm:text-2xl mb-2">
					Admin Access
				</h2>
				<p
					className="font-mono text-xs mb-6 sm:mb-8"
					style={{ color: "rgba(200,190,240,.5)" }}
				>
					Password: admin123
				</p>
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
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 w-full mb-3 sm:mb-4"
					style={{ cursor: "pointer", border: "none" }}
				>
					Login →
				</button>
				<button
					onClick={() => setPage("home")}
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
