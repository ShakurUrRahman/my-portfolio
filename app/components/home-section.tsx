"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedTitle } from ".";

export const socials = [
	{
		iconPath: "/social-icons/Gmail.svg",
		link: `mailto:shakururrahman@gmail.com`,
		label: "Gmail",
	},
	{
		iconPath: "/social-icons/GitHub.svg",
		link: "https://github.com/ShakururRahman",
		label: "GitHub",
	},
	{
		iconPath: "/social-icons/Linkedin.svg",
		link: "https://www.linkedin.com/in/shakururrahman",
		label: "LinkedIn",
	},
	{
		iconPath: "/social-icons/Whatsapp.svg",
		link: `https://wa.me/+8801723688633`,
		label: "WhatsApp",
	},
];

// Animation variants
const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const fadeInUp = {
	hidden: {
		opacity: 0,
		y: 40,
		filter: "blur(10px)",
	},
	show: {
		opacity: 1,
		y: 0,
		filter: "blur(0px)",
		transition: {
			duration: 0.8,
			ease: [0.22, 1, 0.36, 1], // Custom easing
		},
	},
};

const scaleIn = {
	hidden: { scale: 0.8, opacity: 0 },
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const socialIconVariant = {
	hidden: { scale: 0, rotate: -180 },
	show: (i) => ({
		scale: 1,
		rotate: 0,
		transition: {
			delay: 1.2 + i * 0.1,
			duration: 0.5,
			type: "spring",
			stiffness: 200,
		},
	}),
};

export default function HomeSection({ data, setPage, scrollToSection }) {
	return (
		<motion.div
			className="min-h-screen flex flex-col items-center justify-center text-center relative
      px-5 sm:px-8 md:px-12 lg:px-16
      pt-24 sm:pt-28 md:pt-32
      pb-16 sm:pb-20 overflow-hidden"
			initial="hidden"
			animate="show"
			variants={container}
		>
			{/* Floating orbs - decorative background elements */}
			<motion.div
				className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20"
				style={{
					background:
						"radial-gradient(circle, #7B2FFF 0%, transparent 70%)",
				}}
				animate={{
					y: [0, -30, 0],
					x: [0, 20, 0],
					scale: [1, 1.1, 1],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-40 right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
				style={{
					background:
						"radial-gradient(circle, #00F5FF 0%, transparent 70%)",
				}}
				animate={{
					y: [0, 40, 0],
					x: [0, -30, 0],
					scale: [1, 1.2, 1],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>

			{/* Availability badge */}
			{data.about.available && (
				<motion.div
					className="inline-flex items-center gap-2 rounded-full
          px-3 sm:px-5 py-1 mb-5 sm:mb-7 md:mb-9 relative overflow-hidden"
					style={{
						background: "rgba(16, 185, 129, 0.05)",
						border: "1px solid rgba(16, 185, 129, 0.2)",
					}}
					variants={scaleIn}
					whileHover={{ scale: 1.05 }}
				>
					{/* Shimmer effect */}
					<motion.div
						className="absolute inset-0 w-full h-full"
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)",
						}}
						animate={{
							x: ["-100%", "100%"],
						}}
						transition={{
							duration: 3,
							repeat: Infinity,
							ease: "linear",
							repeatDelay: 2,
						}}
					/>
					<motion.span
						className="inline-block w-2 h-2 rounded-full relative z-10"
						style={{ background: "#10b981" }}
						animate={{
							scale: [1, 1.2, 1],
							opacity: [1, 0.8, 1],
						}}
						transition={{
							duration: 1,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
					<span className="font-mono text-xs tracking-widest text-emerald-400 uppercase relative z-10">
						Available for Work
					</span>
				</motion.div>
			)}

			{/* Name with gradient animation */}
			<motion.h1
				className="font-syne font-extrabold mb-3 sm:mb-4 md:mb-6 relative isolate"
				style={{
					fontSize: "clamp(40px,10vw,110px)",
					lineHeight: 0.95,
					letterSpacing: "-0.02em",
				}}
				variants={fadeInUp}
			>
				{/* This span now just handles the layout and background animation */}
				<motion.span
					className="inline-block"
					animate={{
						backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "linear",
					}}
				>
					<AnimatedTitle text={data?.home?.shortName} delay={0.2} />
				</motion.span>

				{/* Glow effect behind text */}
				<motion.span
					className="absolute inset-0 blur-2xl opacity-30"
					style={{
						background: "linear-gradient(90deg, #7B2FFF, #00F5FF)",
						zIndex: -1,
					}}
					animate={{
						opacity: [0.2, 0.4, 0.2],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			</motion.h1>

			{/* Role */}
			<motion.p
				className="font-mono uppercase tracking-widest text-purple-400 mb-3 sm:mb-4 md:mb-6
        text-xs sm:text-sm md:text-base lg:text-lg"
				variants={fadeInUp}
			>
				{data?.home?.title}
			</motion.p>

			{/* Bio */}
			<motion.p
				className="font-mono leading-loose max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl
        mb-6 sm:mb-8 md:mb-12
        text-xs sm:text-sm md:text-base"
				style={{ color: "rgba(200,190,240,.65)" }}
				variants={fadeInUp}
			>
				{data?.home?.description}
			</motion.p>

			{/* CTAs with hover effects */}
			<motion.div
				className="flex flex-col items-center xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center w-full sm:w-auto"
				variants={fadeInUp}
			>
				<motion.button
					onClick={() => scrollToSection(2)}
					className="btn-primary font-mono text-xs uppercase tracking-widest text-white
            rounded-xl px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 w-1/2 sm:w-auto relative overflow-hidden group"
					style={{ cursor: "pointer" }}
					whileHover={{
						scale: 1.05,
						boxShadow: "0 0 30px rgba(123, 47, 255, 0.5)",
					}}
					whileTap={{ scale: 0.95 }}
				>
					{/* Shine effect on hover */}
					<span className="absolute inset-0 w-full h-full">
						<span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-700 ease-out" />
					</span>
					<span className="relative z-10">View Work</span>
				</motion.button>

				<motion.button
					onClick={() => scrollToSection(4)}
					className="btn-outline font-mono text-xs uppercase tracking-widest
            rounded-xl px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 w-1/2 sm:w-auto relative group"
					style={{ cursor: "pointer" }}
					whileHover={{
						scale: 1.05,
						borderColor: "rgba(123, 47, 255, 0.8)",
					}}
					whileTap={{ scale: 0.95 }}
				>
					<span className="relative z-10">Get in Touch</span>
					{/* Glow on hover */}
					<span
						className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style={{
							background:
								"radial-gradient(circle at center, rgba(123, 47, 255, 0.1) 0%, transparent 70%)",
						}}
					/>
				</motion.button>
			</motion.div>

			{/* Social icons with magnetic effect */}
			<motion.div
				className="flex items-center md:gap-2 mt-8 md:px-2 md:py-1 rounded-2xl relative"
				style={{
					background: "rgba(139, 92, 246, 0.05)",
					border: "1px solid rgba(139, 92, 246, 0.3)",
					backdropFilter: "blur(20px)",
				}}
				variants={fadeInUp}
			>
				{socials.map((social, idx) => (
					<motion.div
						key={idx}
						custom={idx}
						variants={socialIconVariant}
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
									className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
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

			{/* Scroll hint with enhanced animation */}
			<motion.div
				className="flex items-center gap-2 sm:gap-4 mt-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 2, duration: 0.8 }}
			>
				<motion.div
					className="h-[1px] sm:h-[1.5px] bg-gradient-to-r from-transparent to-purple-500/60 flex-shrink-0"
					style={{
						width: 28,
						transformOrigin: "left",
					}}
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
				/>

				{/* Animated Mouse (Horizontal) */}
				<motion.div
					className="w-8 h-5 sm:w-11 sm:h-7 border border-purple-500/40 sm:border-2 rounded-[10px] sm:rounded-[14px] relative"
					animate={{
						boxShadow: [
							"0 0 0px rgba(123, 47, 255, 0)",
							"0 0 20px rgba(123, 47, 255, 0.3)",
							"0 0 0px rgba(123, 47, 255, 0)",
						],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				>
					<motion.div
						className="w-1.5 h-[2px] sm:w-2 sm:h-[3px] bg-purple-500/60 rounded-sm absolute top-1/2 -translate-y-1/2"
						style={{ left: 2 }}
						animate={{
							x: [0, 26, 0],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2.2,
						}}
					/>
				</motion.div>

				{/* Right Line */}
				<motion.div
					className="h-[1px] sm:h-[1.5px] bg-gradient-to-r from-purple-500/60 to-transparent flex-shrink-0"
					style={{
						width: 28,
						transformOrigin: "right",
					}}
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ delay: 2.1, duration: 0.8, ease: "easeOut" }}
				/>
			</motion.div>
		</motion.div>
	);
}
