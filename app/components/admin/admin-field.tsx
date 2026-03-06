export default function AdminField({ label, value, onChange }) {
	return (
		<div>
			<label className="block font-mono text-xs uppercase tracking-widest mb-2 text-purple-400">
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
