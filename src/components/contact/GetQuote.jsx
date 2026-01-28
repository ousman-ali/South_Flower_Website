"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Sparkles,
  Search,
  Send,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function GetQuote({ categories, products }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("products", products);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Product Quote Request",
    message: "",
  });

  // Filter products
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.product_category_id?.toString() ===
            selectedCategory.toString(),
        );

  // Toggle product selection
  const toggleProduct = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Convert selected products into message
  const convertToMessage = () => {
    if (selectedProducts.length === 0) return;

    const productList = selectedProducts
      .map((p, i) => `${i + 1}. ${p.name}`)
      .join("\n");

    const messageTemplate = `Hello,
        I would like to request a quote for the following products:
        ${productList}
        Please let me know the prices and availability.
        Thank you.`;

    setFormData((prev) => ({
      ...prev,
      message: messageTemplate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Product Quote Request",
          message: "",
        });
        setSelectedProducts([]);
        setIsSubmitted(false);
      }, 6000);
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">
              Get a Quote
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Select Products &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Send a Request
            </span>
          </h2>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT — PRODUCTS */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                  <p className="text-gray-400">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProducts.find(
                      (p) => p.id === product.id,
                    );

                    return (
                      <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        className={`relative rounded-lg border cursor-pointer transition-all overflow-hidden ${
                          isSelected
                            ? "border-blue-500 shadow-blue-500/20 shadow-lg"
                            : "border-gray-700 hover:border-gray-500"
                        }`}
                        onClick={() => toggleProduct(product)}
                      >
                        {/* Checkbox */}
                        <div className="absolute top-2 right-2 z-10">
                          <input
                            type="checkbox"
                            checked={!!isSelected}
                            readOnly
                            className="w-4 h-4 accent-blue-500"
                          />
                        </div>

                        {/* Image */}
                        <div className="h-24 bg-black">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="p-2">
                          <h3 className="text-xs font-semibold text-white line-clamp-1">
                            {product.name}
                          </h3>

                          <Link
                            href={`/product/${product.slug}`}
                            className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                          >
                            <Eye className="w-3 h-3" />
                            Details
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Convert Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={convertToMessage}
                disabled={selectedProducts.length === 0}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/30 transition disabled:opacity-50"
              >
                Convert to Message ({selectedProducts.length})
              </button>
            </div>
          </div>

          {/* RIGHT — CONTACT FORM */}
          <div>
            <motion.div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl sticky top-20 ">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Send Quote Request
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <CheckCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-white font-semibold">
                      Request Sent Successfully!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
                    />

                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 resize-none focus:outline-none focus:border-blue-500"
                    />

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-blue-500/30 transition disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
