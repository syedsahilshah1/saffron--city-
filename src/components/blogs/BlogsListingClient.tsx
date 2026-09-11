"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Search, X, Tag } from "lucide-react";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { StoredBlog } from "@/lib/types";

interface BlogsListingClientProps {
  initialBlogs: StoredBlog[];
}

export default function BlogsListingClient({ initialBlogs }: BlogsListingClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialBlogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialBlogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchTerm]);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Search & Category Filter Bar */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search news, keywords, or topics..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-[#D4A017]/20 transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Result Count Info */}
          <div className="text-xs text-slate-500 font-medium whitespace-nowrap self-start md:self-auto">
            Showing <strong className="text-slate-900">{filteredBlogs.length}</strong> of{" "}
            <strong className="text-slate-900">{initialBlogs.length}</strong> articles
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#D4A017]" />
            <span>Topics:</span>
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-[#D4A017] text-white shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-amber-300 hover:text-[#D4A017]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Articles */}
      {filteredBlogs.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
          <BookOpen className="w-12 h-12 mx-auto text-[#D4A017]" />
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-lg font-heading">
              No matching articles found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find any publications matching &quot;{searchTerm || selectedCategory}&quot;. Try adjusting your keywords or clearing the filter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="px-5 py-2 rounded-xl bg-[#D4A017] text-white font-bold text-xs shadow-md hover:bg-amber-600 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={80}
          direction="up"
        >
          {filteredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="group rounded-3xl overflow-hidden bg-white border border-amber-200/80 hover:border-[#D4A017] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Featured Image */}
                <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                  <img
                    src={blog.image || "/images/hero-bg.jpg"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-amber-200 text-[#D4A017] text-[11px] font-bold tracking-wide shadow-md">
                    {blog.category}
                  </div>
                </div>

                {/* Text Content */}
                <div className="px-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D4A017]" />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
                      <span>{blog.readTime || "4 min read"}</span>
                    </div>
                  </div>

                  <h2 className="font-bold text-slate-900 text-lg sm:text-xl font-heading leading-snug group-hover:text-[#D4A017] transition-colors line-clamp-2">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer Link */}
              <div className="p-6 pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  By {blog.author}
                </span>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A017] group-hover:text-amber-700 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </StaggerReveal>
      )}
    </div>
  );
}
