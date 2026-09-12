import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") === "true";
    const slug = searchParams.get("slug");

    if (slug) {
      const blog = await db.getBlogBySlug(slug);
      if (!blog) {
        return NextResponse.json(
          { success: false, message: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: blog });
    }

    const blogs = await db.getBlogs(publishedOnly);
    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (error: any) {
    console.error("Blogs GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, content, image, category, author, readTime, isPublished } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug =
      body.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newBlog = await db.createBlog({
      slug,
      title,
      excerpt: excerpt || title,
      content,
      image: image || "/images/hero-bg.webp",
      category: category || "News & Updates",
      author: author || "Saffron City Official",
      readTime: readTime || "4 min read",
      isPublished: isPublished !== undefined ? isPublished : true,
      seoTitle: body.seoTitle || title,
      metaDescription: body.metaDescription || excerpt || title,
      canonicalUrl: body.canonicalUrl || `https://saffroncity.org/blogs/${slug}`,
      robotsIndex: body.robotsIndex !== undefined ? body.robotsIndex : true,
      robotsFollow: body.robotsFollow !== undefined ? body.robotsFollow : true,
      focusKeyword: body.focusKeyword,
      secondaryKeywords: body.secondaryKeywords,
      h1Heading: body.h1Heading || title,
      imageAlt: body.imageAlt || title,
      ogTitle: body.ogTitle || body.seoTitle || title,
      ogDescription: body.ogDescription || body.metaDescription || excerpt || title,
      ogImage: body.ogImage || image || "/images/hero-bg.webp",
      twitterTitle: body.twitterTitle || body.seoTitle || title,
      twitterDescription: body.twitterDescription || body.metaDescription || excerpt || title,
      twitterImage: body.twitterImage || image || "/images/hero-bg.webp",
      customSchema: body.customSchema,
    });

    return NextResponse.json(
      { success: true, message: "Blog created successfully", data: newBlog },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Blogs POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required for update" },
        { status: 400 }
      );
    }

    const updatedBlog = await db.updateBlog(id, updates);
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error("Blogs PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const deleted = await db.deleteBlog(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: any) {
    console.error("Blogs DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
