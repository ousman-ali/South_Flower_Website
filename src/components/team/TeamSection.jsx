"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  Github,
  Globe,
  Sparkles,
  Users,
  Award,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Creative visionary with 8+ years in design. Passionate about user-centered design and innovation.",
    skills: ["UI/UX", "Figma", "Prototyping", "Branding"],
    social: {
      linkedin: "alexjohnson",
      twitter: "alexdesign",
      instagram: "alex.designs",
      email: "alex@southflower.com",
    },
    color: "from-blue-500 to-cyan-400",
    accentColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Senior Developer",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c7?w=400&h=400&fit=crop",
    bio: "Full-stack developer specializing in React and Node.js. Loves solving complex problems.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    social: {
      linkedin: "sarahmiller",
      twitter: "sarah_dev",
      github: "sarahmiller",
      email: "sarah@southflower.com",
    },
    color: "from-purple-500 to-pink-400",
    accentColor: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Project Manager",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Agile expert with 10+ years managing tech projects. Ensures timely delivery and quality.",
    skills: ["Agile", "Scrum", "Jira", "Leadership"],
    social: {
      linkedin: "michaelchen",
      twitter: "mike_pm",
      instagram: "mike.chen",
      email: "michael@southflower.com",
    },
    color: "from-emerald-500 to-green-400",
    accentColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Marketing strategist with expertise in digital campaigns and brand growth.",
    skills: ["SEO", "Content", "Analytics", "Strategy"],
    social: {
      linkedin: "emmarodriguez",
      twitter: "emma_marketing",
      instagram: "emma.marketing",
      email: "emma@southflower.com",
    },
    color: "from-amber-500 to-orange-400",
    accentColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Data wizard specializing in machine learning and predictive analytics.",
    skills: ["Python", "ML", "SQL", "TensorFlow"],
    social: {
      linkedin: "davidkim",
      twitter: "david_data",
      github: "davidkim",
      email: "david@southflower.com",
    },
    color: "from-indigo-500 to-blue-400",
    accentColor: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    id: 6,
    name: "Lisa Wong",
    role: "UX Researcher",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "User experience researcher focused on creating intuitive and accessible designs.",
    skills: ["Research", "Testing", "Analytics", "Usability"],
    social: {
      linkedin: "lisawong",
      twitter: "lisa_ux",
      instagram: "lisa.ux",
      email: "lisa@southflower.com",
    },
    color: "from-rose-500 to-pink-400",
    accentColor: "text-rose-500",
    bgColor: "bg-rose-50",
  },
];

const animatedShapes = [
  {
    id: 1,
    size: 80,
    x: "5%",
    y: "10%",
    duration: 30,
    color: "from-blue-100 to-cyan-100",
  },
  {
    id: 2,
    size: 60,
    x: "90%",
    y: "20%",
    duration: 35,
    color: "from-purple-100 to-pink-100",
  },
  {
    id: 3,
    size: 70,
    x: "10%",
    y: "85%",
    duration: 28,
    color: "from-emerald-100 to-green-100",
  },
  {
    id: 4,
    size: 50,
    x: "85%",
    y: "75%",
    duration: 32,
    color: "from-amber-100 to-orange-100",
  },
  {
    id: 5,
    size: 90,
    x: "70%",
    y: "10%",
    duration: 25,
    color: "from-indigo-100 to-blue-100",
  },
  {
    id: 6,
    size: 55,
    x: "20%",
    y: "60%",
    duration: 29,
    color: "from-rose-100 to-pink-100",
  },
];

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const membersPerPage = 3;

  const totalPages = Math.ceil(teamMembers.length / membersPerPage);
  const currentMembers = teamMembers.slice(
    currentPage * membersPerPage,
    (currentPage + 1) * membersPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const socialIcons = {
    linkedin: <Linkedin className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    github: <Github className="w-4 h-4" />,
    email: <Mail className="w-4 h-4" />,
    globe: <Globe className="w-4 h-4" />,
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {animatedShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute rounded-full bg-gradient-to-br ${shape.color} opacity-30`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, shape.id % 2 === 0 ? 15 : -10, 0],
              rotate: shape.id % 2 === 0 ? [0, 90, 0] : [0, -90, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.5,
            }}
          />
        ))}

        {/* Large floating orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/30 to-cyan-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-blue-600">
              Meet Our Team
            </span>
            <Users className="w-4 h-4 text-purple-500" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Talented Minds
            </span>{" "}
            Behind Our Success
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A diverse team of experts dedicated to delivering exceptional
            results and innovative solutions.
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="mb-12">
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {currentMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                activeMember={activeMember}
                setActiveMember={setActiveMember}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                socialIcons={socialIcons}
              />
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentMembers.map((member) => (
                <TeamCard
                  key={member.id}
                  member={member}
                  activeMember={activeMember}
                  setActiveMember={setActiveMember}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  socialIcons={socialIcons}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-3 rounded-full border ${
                    currentPage === 0
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentPage === idx
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`p-3 rounded-full border ${
                    currentPage === totalPages - 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const TeamCard = ({
  member,
  activeMember,
  setActiveMember,
  favorites,
  toggleFavorite,
  socialIcons,
}) => {
  const isActive = activeMember === member.id;
  const isFavorite = favorites.includes(member.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-white rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
        isActive
          ? "border-blue-200 shadow-2xl"
          : "border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl"
      }`}
      onMouseEnter={() => setActiveMember(member.id)}
      onMouseLeave={() => setActiveMember(null)}
    >
      {/* Background Gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.color}`}
      />

      {/* Favorite Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toggleFavorite(member.id)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg"
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </motion.button>

      {/* Content */}
      <div className="p-6">
        {/* Image and Basic Info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative flex-shrink-0">
            <motion.div
              className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
                member.bgColor
              } ${isActive ? "border-white shadow-lg" : "border-white"}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Online Status Indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${member.bgColor} ${member.accentColor}`}
              >
                {member.role}
              </span>
              <div className="flex-1" />
              <div className="text-xs text-gray-500">Member since 2022</div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{member.bio}</p>
          </div>
        </div>

        {/* Social Links - Visible on hover */}
        <motion.div
          className="border-t border-gray-100 pt-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: isActive ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Connect</h4>
          <div className="flex items-center gap-3">
            {Object.entries(member.social).map(([platform, handle]) => (
              <motion.a
                key={platform}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-all ${
                  platform === "linkedin"
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : platform === "twitter"
                    ? "bg-sky-50 text-sky-600 hover:bg-sky-100"
                    : platform === "instagram"
                    ? "bg-pink-50 text-pink-600 hover:bg-pink-100"
                    : platform === "github"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                aria-label={`${platform} profile`}
                onClick={(e) => e.stopPropagation()}
              >
                {socialIcons[platform]}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact Button - Appears on hover */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isActive ? 1 : 0,
            height: isActive ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

const ArrowRight = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </svg>
);
