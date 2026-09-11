"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, BookOpen, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { StoredBlog } from "@/lib/types";

export default function HomeBlogsSection({
  initialBlogs = [],
}: {
  initialBlogs?: StoredBlog[];
}) {
  const [blogs, setBlogs] = useState<StoredBlog[]>(initialBlogs);

  useEffect(() => {
    if (initialBlogs.length === 0) {
      fetch("/api/blogs?published=true")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            setBlogs(data.data.slice(0, 3));
          }
        })
        .catch((err) => console.warn("Could not load blogs for homepage:", err));
    } else {
      setBlogs(initialBlogs.slice(0, 3));
    }
  }, [initialBlogs]);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <ScrollReveal animation="fade-up" className="space-y-3 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 tracking-normal leading-[1.18]">
            Latest News &amp;{" "}
            <span className="font-serif italic font-normal text-slate-800">
              Market
            </span>{" "}
            <span className="font-serif font-semibold text-slate-900">
              Insights
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Stay updated with recent development milestones, infrastructure reports, and real estate market trends in Saffron City.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={100} className="shrink-0">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4A017]" />
          </Link>
        </ScrollReveal>
      </div>

      {/* Blogs Grid */}
      <StaggerReveal
        className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        staggerDelay={80}
        direction="up"
      >
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group rounded-3xl overflow-hidden bg-white border border-amber-200/80 hover:border-[#D4A017] shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Featured Image */}
              <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                <img
                  src={blog.image || "/images/hero-bg.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-amber-200 text-[#D4A017] text-[11px] font-bold tracking-wide shadow-md">
                  {blog.category}
                </div>
              </div>

              {/* Body Content */}
              <div className="px-6 space-y-2.5">
                {/* Meta Info */}
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

                <h3 className="font-bold text-slate-900 text-lg sm:text-xl font-heading leading-snug group-hover:text-[#D4A017] transition-colors line-clamp-2">
                  <Link href={`/blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {blog.excerpt}
                </p>
              </div>
            </div>

            {/* Read Article Link */}
            <div className="p-6 pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                By {blog.author}
              </span>
              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4A017] group-hover:text-amber-700 transition-colors"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </StaggerReveal>
    </section>
  );
}
