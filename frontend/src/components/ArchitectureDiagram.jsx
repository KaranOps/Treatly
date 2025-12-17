import React from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Scan,
    TestTube,
    FileOutput,
    BrainCircuit,
    Stethoscope
} from 'lucide-react';

import architectureImg from '../assets/architecture.png';

const ArchitectureDiagram = () => {
    const containerRef = React.useRef(null);
    const [scale, setScale] = React.useState(1);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768); // Mobile breakpoint

            if (containerRef.current) {
                const parentWidth = containerRef.current.parentElement?.offsetWidth || window.innerWidth;
                const baseWidth = 1000;
                // Add some padding (e.g. 32px)
                const availableWidth = parentWidth - 32;

                if (availableWidth < baseWidth) {
                    setScale(availableWidth / baseWidth);
                } else {
                    setScale(1);
                }
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <div className="w-full flex justify-center py-10 px-4">
                <img
                    src={architectureImg}
                    alt="Architecture Diagram"
                    className="w-full max-w-md rounded-2xl shadow-lg border border-purple-100"
                />
            </div>
        );
    }

    return (
        <div className="w-full overflow-hidden flex justify-center py-10" ref={containerRef}>
            <div
                className="relative bg-white/50 rounded-3xl border border-purple-100 shadow-sm transition-transform duration-200 origin-top"
                style={{
                    width: '1000px',
                    height: '600px',
                    transform: `scale(${scale})`,
                    marginBottom: `-${600 * (1 - scale)}px` // Reduce vertical space when scaled down
                }}
            >

                {/* Nodes - Absolute Positioned to match SVG coordinates */}

                {/* Doctor (500, 80) */}
                <div className="absolute top-[50px] left-[450px] w-[100px] z-20">
                    <Node icon={<Stethoscope className="w-6 h-6 text-white" />} label="Doctor" color="bg-blue-500" />
                </div>

                {/* Main Agent (500, 205) */}
                <div className="absolute top-[180px] left-[450px] w-[100px] z-20">
                    <Node icon={<BrainCircuit className="w-8 h-8 text-white" />} label="Main Agent" color="bg-[#754579] scale-125" />
                </div>

                {/* Sub Agents (200, 350 | 500, 350 | 800, 350) */}
                <div className="absolute top-[350px] left-[150px] w-[100px] z-20">
                    <SubAgentGroup icon={<FileText className="w-5 h-5" />} label="Rx Reader" subLabel="ML Models" />
                </div>
                <div className="absolute top-[350px] left-[450px] w-[100px] z-20">
                    <SubAgentGroup icon={<Scan className="w-5 h-5" />} label="Scan Analysis" subLabel="X-Ray/MRI" />
                </div>
                <div className="absolute top-[350px] left-[750px] w-[100px] z-20">
                    <SubAgentGroup icon={<TestTube className="w-5 h-5" />} label="Lab Results" subLabel="Blood/Urine" />
                </div>

                {/* Plan & Format (500, 500) */}
                <div className="absolute top-[500px] left-[450px] w-[100px] z-20">
                    <Node icon={<FileOutput className="w-6 h-6 text-white" />} label="Plan & Format" color="bg-green-500" />
                </div>

                {/* SVG Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 600">
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#754579" opacity="0.3" />
                        </marker>
                    </defs>

                    {/* 1. Doctor -> Main */}
                    <FlowPath d="M 500 110 L 500 180" delay={0} />

                    {/* 2. Fan Out: Main -> Subs */}
                    <FlowPath d="M 500 230 C 500 280, 200 250, 200 350" delay={1.5} />
                    <FlowPath d="M 500 230 L 500 350" delay={1.5} />
                    <FlowPath d="M 500 230 C 500 280, 800 250, 800 350" delay={1.5} />

                    {/* 3. Converge: Subs -> Main (Visualized as return path) */}
                    <FlowPath d="M 200 410 C 200 460, 480 320, 480 230" delay={3} color="#b57aba" />
                    <FlowPath d="M 500 410 L 500 230" delay={3} color="#b57aba" />
                    <FlowPath d="M 800 410 C 800 460, 520 320, 520 230" delay={3} color="#b57aba" />

                    {/* 4. Main -> Plan */}
                    <FlowPath d="M 530 230 C 650 250, 650 480, 530 520" delay={4.5} />

                    {/* 5. Plan -> Doctor */}
                    <FlowPath d="M 470 520 C 50 480, 50 150, 470 80" delay={6} opacity={0.2} dashed duration={2} />

                </svg>

                {/* Labels for phases */}
                <div className="absolute top-[280px] left-[50px] text-xs font-bold text-gray-400 rotate-[-90deg]">PARALLEL PROCESSING</div>
            </div>
        </div>
    );
};

const Node = ({ icon, label, color }) => (
    <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-2"
    >
        <div className={`p-3 rounded-xl shadow-lg shadow-purple-100 ${color} flex items-center justify-center transform transition-transform hover:scale-110`}>
            {icon}
        </div>
        <span className="font-bold text-sm text-gray-700 bg-white/90 px-3 py-1 rounded-full shadow-sm border border-gray-100 whitespace-nowrap">{label}</span>
    </motion.div>
);

const SubAgentGroup = ({ icon, label, subLabel }) => (
    <div className="flex flex-col items-center gap-2 group">
        <div className="p-3 bg-white border-2 border-purple-100 rounded-xl shadow-md flex items-center justify-center group-hover:border-[#754579] transition-colors">
            <div className="text-[#754579]">{icon}</div>
        </div>
        <div className="text-center">
            <div className="font-bold text-sm text-gray-800 whitespace-nowrap">{label}</div>
            <div className="text-[10px] text-gray-500 bg-purple-50 px-2 py-0.5 rounded-full mt-1 border border-purple-100 whitespace-nowrap">{subLabel}</div>
        </div>
    </div>
);

const FlowPath = ({ d, delay, color = "#754579", dashed = false, opacity = 1, duration = 1.5 }) => {
    return (
        <>
            <path
                d={d}
                stroke={color}
                strokeWidth="2"
                fill="none"
                strokeOpacity={0.15}
                strokeDasharray={dashed ? "5,5" : "none"}
                markerEnd="url(#arrowhead)"
            />
            <motion.circle
                r="4"
                fill={color}
                opacity={opacity}
            >
                <motion.animateMotion
                    dur={`${duration}s`}
                    repeat={Infinity}
                    repeatDelay={5.5}
                    path={d}
                    begin={`${delay}s`}
                    fill="freeze"
                    rotate="auto" // Orients the particle
                />
            </motion.circle>
        </>
    );
};

export default ArchitectureDiagram;
