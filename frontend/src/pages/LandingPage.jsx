import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Layers,
    Bot,
    Database,
    Mic,
    Upload,
    Activity,
    ClipboardCheck,
    ArrowRight,
    Stethoscope,
    Github
} from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const LandingPage = () => {
    const navigate = useNavigate();

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen font-sans bg-white text-gray-800 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#754579] p-2 rounded-lg">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#754579] to-[#b57aba] bg-clip-text text-transparent">
                                Treatly
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com/KaranOps/Treatly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#754579] hover:text-[#5a355d] transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </a>
                            <Link
                                to="/login"
                                className="text-[#754579] font-medium hover:text-[#5a355d] transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[#754579] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#5a355d] transition-all hover:shadow-lg hover:shadow-purple-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-[#c3a2c5]/20 -z-10" />
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c3a2c5]/10 to-transparent -z-10 blur-3xl" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-purple-100 text-[#754579] font-semibold text-sm tracking-wide"
                    >
                        The Future of Clinical Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        Empowering Doctors with <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-[#754579] via-[#9e60a4] to-[#b57aba] bg-clip-text text-transparent">
                            Multimodal Agentic Intelligence
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        One platform to fuse lab reports, medical scans, and prescriptions into actionable SOAP notes. Build a digital legacy for every patient.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <button
                            onClick={() => navigate('/login')}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-[#754579] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 hover:bg-[#5a355d] hover:shadow-xl hover:shadow-purple-200/50"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
                            <span className="relative flex items-center gap-2">
                                Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="absolute -inset-3 rounded-full bg-[#754579] opacity-20 animate-ping" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        <FeatureCard
                            icon={<Layers className="w-8 h-8 text-[#754579]" />}
                            title="Multimodal Fusion"
                            desc="Process JPG scans, PDF lab reports, and text summaries simultaneously."
                        />
                        <FeatureCard
                            icon={<Bot className="w-8 h-8 text-[#754579]" />}
                            title="Agentic AI (In-Dev)"
                            desc="A specialized multi-agent architecture where specialized AI agents work in parallel for higher accuracy."
                        />
                        <FeatureCard
                            icon={<Database className="w-8 h-8 text-[#754579]" />}
                            title="Longitudinal Records"
                            desc="Track patient history across multiple visits to analyze disease patterns and refine medications."
                        />
                        <FeatureCard
                            icon={<Mic className="w-8 h-8 text-[#754579]" />}
                            title="Voice Command"
                            desc="Dictate case summaries or search for patient history hands-free."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Architecture / Under the Hood */}
            <section className="py-20 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-[#754579] mb-4">Under the Hood: Multi-Agent Orchestration</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            See how our specialized AI agents work in parallel to synthesize your clinical data.
                        </p>
                    </motion.div>

                    <ArchitectureDiagram />
                </div>
            </section>



            {/* CTA Footer */}
            <section className="py-20 bg-[#754579] text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the Future of Clinical Documentation</h2>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-[#754579] px-10 py-4 rounded-full text-lg font-bold hover:bg-purple-50 transition-colors shadow-2xl hover:shadow-white/20 transform hover:-translate-y-1"
                    >
                        Get Started Now
                    </button>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        variants={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 }
        }}
        className="bg-purple-50/50 p-8 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 border border-transparent hover:border-purple-100 group"
    >
        <div className="bg-white p-4 rounded-xl inline-block shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
);

const StepCard = ({ number, icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="relative text-center"
    >
        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6 relative z-10">
            <div className="text-[#754579]">{icon}</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#754579] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {number}
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{desc}</p>
    </motion.div>
);

export default LandingPage;
