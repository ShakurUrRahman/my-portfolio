"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Glass, SectionTitle } from ".";
import { socials } from "./home-section";
import Link from "next/link";

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 30,
		filter: "blur(10px)",
	},
	visible: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const fieldVariants = {
	hidden: {
		opacity: 0,
		x: -30,
		scale: 0.95,
	},
	visible: (i: number) => ({
		opacity: 1,
		x: 0,
		scale: 1,
		transition: {
			delay: i * 0.1,
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

const successVariants = {
	hidden: {
		scale: 0.8,
		opacity: 0,
		rotate: -10,
	},
	visible: {
		scale: 1,
		opacity: 1,
		rotate: 0,
		transition: {
			type: "spring",
			stiffness: 200,
			damping: 20,
		},
	},
	exit: {
		scale: 0.8,
		opacity: 0,
		rotate: 10,
		transition: {
			duration: 0.3,
		},
	},
};

const socialIconVariants = {
	hidden: { scale: 0, rotate: -180 },
	visible: (i: number) => ({
		scale: 1,
		rotate: 0,
		transition: {
			delay: 0.8 + i * 0.1,
			type: "spring",
			stiffness: 200,
			damping: 15,
		},
	}),
};

export default function ContactSection({
	onNewMessage,
	onFieldFocus,
	onFieldBlur,
}) {
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		amount: 0.1, // Trigger when just 10% is visible (safer for mobile)
		margin: "-10% 0px -10% 0px", // Use a small vertical offset instead
	});

	const submit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.message) return;
		setError("");
		setLoading(true);

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
			setLoading(false);
		}
	};

	return (
		<motion.div
			ref={ref}
			className="min-h-screen
      pt-20 sm:pt-24 md:pt-28 lg:pt-32
      pb-12 sm:pb-16 md:pb-20
      px-4 sm:px-6 md:px-10
      max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl
      mx-auto"
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
		>
			<motion.div variants={itemVariants}>
				<SectionTitle label="004" title="Get In Touch" />
			</motion.div>

			<motion.div variants={itemVariants}>
				<Glass className="p-6 sm:p-8 md:p-10 lg:p-12 mt-6 sm:mt-8 md:mt-10 relative overflow-hidden group">
					{/* Glow effect */}
					<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
						<div className="absolute top-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
						<div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl" />
					</div>

					<AnimatePresence mode="wait">
						{sent ? (
							<motion.div
								className="text-center py-6 sm:py-10 relative z-10"
								key="success"
								variants={successVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<motion.div
									className="text-4xl sm:text-5xl mb-4 sm:mb-5"
									animate={{
										scale: [1, 1.2, 1],
										rotate: [0, 10, -10, 0],
									}}
									transition={{
										duration: 0.6,
										ease: "easeInOut",
									}}
								>
									✨
								</motion.div>
								<motion.h3
									className="font-syne font-bold text-white text-xl sm:text-2xl mb-2 sm:mb-3"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 }}
								>
									Message Sent!
								</motion.h3>
								<motion.p
									className="font-mono text-xs sm:text-sm"
									style={{ color: "rgba(200,190,240,.6)" }}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.3 }}
								>
									I'll get back to you soon.
								</motion.p>
								<motion.button
									onClick={() => setSent(false)}
									className="btn-ghost font-mono text-xs rounded-lg px-4 sm:px-5 py-2 mt-5 sm:mt-6"
									style={{ cursor: "pointer" }}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Send Another
								</motion.button>
							</motion.div>
						) : (
							<motion.form
								key="form"
								onSubmit={submit}
								className="flex flex-col gap-4 sm:gap-5 relative z-10"
								initial="hidden"
								animate="visible"
								variants={containerVariants}
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
								].map(({ key, label, type, ph }, index) => (
									<motion.div
										key={key}
										custom={index}
										variants={fieldVariants}
									>
										<motion.label
											className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{
												delay: index * 0.1 + 0.1,
											}}
										>
											{label}
										</motion.label>
										<motion.input
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
											whileFocus={{
												scale: 1.02,
												borderColor:
													"rgba(139, 92, 246, 0.5)",
												boxShadow:
													"0 0 20px rgba(139, 92, 246, 0.2)",
											}}
											transition={{ duration: 0.2 }}
										/>
									</motion.div>
								))}

								<motion.div custom={2} variants={fieldVariants}>
									<motion.label
										className="block font-mono text-xs uppercase tracking-widest mb-1.5 sm:mb-2 text-purple-400"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.3 }}
									>
										Message
									</motion.label>
									<motion.textarea
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
										whileFocus={{
											scale: 1.02,
											borderColor:
												"rgba(139, 92, 246, 0.5)",
											boxShadow:
												"0 0 20px rgba(139, 92, 246, 0.2)",
										}}
										transition={{ duration: 0.2 }}
									/>
								</motion.div>

								<motion.button
									type="submit"
									disabled={loading}
									className="btn-primary font-mono text-xs uppercase tracking-widest text-white rounded-xl py-3 sm:py-4 mt-1 flex items-center justify-center gap-2 relative overflow-hidden"
									style={{
										cursor: loading
											? "not-allowed"
											: "pointer",
										border: "none",
										opacity: loading ? 0.7 : 1,
									}}
									custom={3}
									variants={fieldVariants}
									whileHover={
										!loading
											? {
													scale: 1.02,
													boxShadow:
														"0 0 30px rgba(139, 92, 246, 0.5)",
												}
											: {}
									}
									whileTap={!loading ? { scale: 0.98 } : {}}
								>
									{/* Shine effect */}
									{!loading && (
										<motion.div
											className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
											initial={{ x: "-100%" }}
											whileHover={{ x: "100%" }}
											transition={{ duration: 0.6 }}
										/>
									)}

									<span className="relative z-10 flex items-center gap-2">
										{loading ? (
											<>
												{/* Spinner */}
												<motion.svg
													width="14"
													height="14"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													animate={{ rotate: 360 }}
													transition={{
														duration: 1,
														repeat: Infinity,
														ease: "linear",
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
												</motion.svg>
												Sending...
											</>
										) : (
											<>Send Message →</>
										)}
									</span>
								</motion.button>

								<AnimatePresence>
									{error && (
										<motion.p
											className="font-mono text-xs text-red-400 text-center mt-2"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.3 }}
										>
											{error}
										</motion.p>
									)}
								</AnimatePresence>
							</motion.form>
						)}
					</AnimatePresence>
				</Glass>
			</motion.div>

			{/* Social icons */}
			<motion.div
				className="flex justify-center items-center md:gap-2 mt-8 md:px-2 md:py-1 rounded-2xl relative"
				style={{
					background: "transparent",
					border: "1px solid rgba(139, 92, 246, 0.3)",
					backdropFilter: "blur(20px)",
				}}
				variants={itemVariants}
			>
				{socials.map((social, idx) => (
					<motion.div
						key={idx}
						custom={idx}
						variants={socialIconVariants}
					>
						<motion.div
							whileHover={{
								scale: 1.2,
								rotate: [0, -10, 10, -10, 0],
							}}
							whileTap={{ scale: 0.9 }}
							transition={{
								rotate: {
									duration: 0.5,
								},
							}}
						>
							<Link
								href={social.link}
								target="_blank"
								rel="noopener noreferrer"
								className="block relative group"
								aria-label={social.label}
							>
								<img
									src={social.iconPath}
									alt={social.label}
									className="w-[60px] h-[60px] object-contain ml-1.5 mt-1.5 transition-all duration-300"
								/>
								{/* Glow effect on hover */}
								<span
									className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
									style={{
										background:
											"radial-gradient(circle, #7B2FFF 0%, transparent 70%)",
									}}
								/>
							</Link>
						</motion.div>
					</motion.div>
				))}
			</motion.div>
		</motion.div>
	);
}
