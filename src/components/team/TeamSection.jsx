"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Mail,
  Github,
  Globe,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
    color: "from-blue-100 to-pink-100",
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

export default function TeamSection({ teams }) {
  const [activeMember, setActiveMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const membersPerPage = 3;

  const totalPages = Math.ceil(teams.length / membersPerPage);
  const currentMembers = teams.slice(
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
    facebook: <Facebook className="w-4 h-4" />,
  };

  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
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
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/30 to-pink-100/20 rounded-full blur-3xl"
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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-50 border border-blue-100 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              Meet Our Experts
            </span>
            <Users className="w-4 h-4 text-blue-600" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            Certified Technicians You Can Trust
          </h2>
        </motion.div>

        {/* Team Cards */}
        <div className="">
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
              <div className="flex items-center justify-center gap-4 mt-4">
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
                          ? "bg-gradient-to-r from-blue-500 to-blue-500 w-6"
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
          ? "border-gray-200 shadow-2xl"
          : "border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl"
      }`}
      onMouseEnter={() => setActiveMember(member.id)}
      onMouseLeave={() => setActiveMember(null)}
    >
      {/* Background Gradient */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-500`}
      />

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
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${member?.image}`}
                alt={member?.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Online Status Indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">
              {member.title_prefix}
              {". "}
              {member?.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-blue-500 bg-blue-50`}
              >
                {member?.position}
              </span>
              <div className="flex-1" />
            </div>
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
            {Object.entries(member.social_media).map(([platform, handle]) => (
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
                    : platform === "facebook"
                    ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
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
