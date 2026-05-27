# My Online Store

![App Preview](https://imgix.cosmicjs.com/bc63fe90-5a1c-11f1-ab5f-510f297ffc99-autopilot-photo-1514228742587-6b1558fcca3d-1779921489138.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern e-commerce storefront built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🏠 Beautiful homepage with featured products
- 📦 Full product catalog with detailed product pages
- 🏷️ Category browsing
- 🎨 Product variants (size, color, SKU)
- ⭐ Customer reviews with star ratings
- 🎯 Server-side rendering for SEO
- 📱 Fully responsive design
- 🖼️ Optimized images via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a1771e7f2c683f5f2b36669&clone_repository=6a177312f2c683f5f2b366b7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews"

### Code Generation Prompt

> Build a Next.js application for an online business called "My Online Store". The content is managed in Cosmic CMS with the following object types: categories, products, variants, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: An e-commerce store with products, categories, variants, and customer reviews

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic SDK](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- Bun (or Node.js 18+)
- A Cosmic account with the bucket configured

### Installation

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

Fetch all products:

```typescript
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

Fetch a single product by slug:

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app uses 4 content types: categories, products, variants, and reviews — all connected via object metafields with `depth(1)` queries.

## Deployment Options

Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Set these environment variables:

- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->