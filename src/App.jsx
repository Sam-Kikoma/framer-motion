import { motion, useAnimation, useInView, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const gridContainerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.25 } } };
const gridSquareVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const svgVariants = {
	hidden: { opacity: 0, pathLength: 0, fill: "rgba(252,211,77,0)" },
	visible: { opacity: 1, pathLength: 1, fill: "rgba(252,211,77,1)" },
};
const App = () => {
	const { scrollYProgress: completionProgress } = useScroll();
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, { once: true });
	const mainControls = useAnimation();
	useEffect(() => {
		if (isInView) {
			mainControls.start("visible");
		}
	}, [isInView]);
	return (
		<div className="flex flex-col gap-10 overflow-hidden">
			<motion.section
				variants={gridContainerVariants}
				initial="hidden"
				animate="show"
				className="grid grid-cols-3 p-10 gap-10"
			>
				{/* Fade up */}
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.div
						className="w-20 h-20 bg-stone-100 rounded-lg"
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
					/>
					<motion.div
						className="w-20 h-20 bg-stone-100 rounded-full"
						initial={{ opacity: 0, y: -100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
					/>
				</motion.div>
				{/* Shape shifting */}
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.div
						className="w-1/3 h-1/3 shadow-md bg-rose-400"
						animate={{
							scale: [1, 2, 2, 1],
							rotate: [0, 90, 90, 0],
							borderRadius: ["10%", "50%", "50%", "10%"],
						}}
						transition={{ duration: 5, ease: "easeInOut", repeat: 2, repeatDelay: 1 }}
					/>
				</motion.div>
				{/* Animate on hover and click */}
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.button
						whileTap={{ scale: 0.9 }}
						whileHover={{ scale: 1.1, backgroundColor: "#d1d5db", color: "black" }}
						transition={{ bounceDamping: 20, bounceStiffness: 600 }}
						className="bg-emerald-600 w-1/3 p-4 rounded-lg text-2xl text-gray-100 tracking-wide"
					>
						Subscribe
					</motion.button>
				</motion.div>
				{/* Drag and drop */}
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.div
						className="w-1/3 h-1/3 bg-orange-500 rounded-3xl cursor-grab"
						drag
						dragConstraints={{ top: -125, right: 150, bottom: 125, left: -150 }}
						dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
					/>
				</motion.div>
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
						<motion.div
							className="w-full bg-gray-400 rounded-xl h-full origin-bottom"
							style={{ scaleY: completionProgress }}
						/>
					</motion.div>
				</motion.div>
				<motion.div
					variants={gridSquareVariants}
					className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
				>
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						className="w-1/2 stroke-amber-500 stroke-[0.5]"
					>
						<motion.path
							d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
							variants={svgVariants}
							initial="hidden"
							animate="visible"
							transition={{
								default: {
									duration: 2,
									ease: "easeInOut",
									delay: 1,
									repeat: Infinity,
									repeatType: "reverse",
									repeatDelay: 1,
								},
								fill: {
									duration: 2,
									ease: "easeIn",
									delay: 2,
									repeat: Infinity,
									repeatType: "reverse",
									repeatDelay: 1,
								},
							}}
						/>
					</motion.svg>
				</motion.div>
			</motion.section>
			<section className="flex flex-col gap-10 mb-10" ref={containerRef}>
				<motion.h1
					className="text-5xl tracking-wide text-slate-100 text-center "
					animate={mainControls}
					initial="hidden"
					variants={{
						hidden: { opacity: 0, y: 75 },
						visible: { opacity: 1, y: 0 },
					}}
					transition={{ delay: 0.3 }}
				>
					Just keep scrolling
				</motion.h1>
				<p className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, libero eum deleniti veritatis accusantium
					excepturi quia tempore error modi odio dicta est. Nostrum, ex ipsam? Nemo repellat tenetur aliquid cum.
				</p>
				<p className="text-slate-100 font-thin text-4xl w-1/2 mx-auto">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, libero eum deleniti veritatis accusantium
					excepturi quia tempore error modi odio dicta est. Nostrum, ex ipsam? Nemo repellat tenetur aliquid cum.
				</p>
			</section>
		</div>
	);
};

export default App;
