# KevinL Blog Design System

## 1. Direction

This blog should feel like a calm personal knowledge base for a developer who also writes about life. Use Mintlify as the primary reference for clarity, reading comfort, and code-friendly structure. Use Notion as the secondary reference for warmth, approachable spacing, and personal writing texture.

The result should not feel like a SaaS landing page. It should feel like a thoughtful reading product: quiet, fast to scan, comfortable for long posts, and precise enough for technical writing.

## 2. Visual Principles

- White-first reading surface with warm neutral undertones.
- Minimal color. Use one green accent for links, active states, focus, and small labels.
- Prefer borders and whitespace over heavy shadows.
- Cards should be structured but not decorative.
- Images support the article; they should not overpower the reading hierarchy.
- Lists, metadata, tags, and table of contents should scan quickly.
- Dark mode should be calm charcoal, not pure black and not neon-heavy.

## 3. Color Palette

### Light Mode

- Canvas: `#ffffff`
- Warm canvas tint: `#faf9f7`
- Surface: `#ffffff`
- Soft surface: `#f6f5f4`
- Primary text: `#181716`
- Secondary text: `#615d59`
- Muted text: `#8a8580`
- Border subtle: `rgba(24, 23, 22, 0.08)`
- Border medium: `rgba(24, 23, 22, 0.12)`
- Accent green: `#18a875`
- Accent green strong: `#0f7a56`
- Accent green tint: `#e8f7f0`
- Code surface: `#f4f3f1`

### Dark Mode

- Canvas: `#10100f`
- Warm canvas tint: `#151412`
- Surface: `#181715`
- Soft surface: `#201f1c`
- Primary text: `#f4f1ec`
- Secondary text: `#c8c0b8`
- Muted text: `#8f8880`
- Border subtle: `rgba(244, 241, 236, 0.08)`
- Border medium: `rgba(244, 241, 236, 0.14)`
- Accent green: `#57d9a3`
- Accent green strong: `#8ee8bf`
- Accent green tint: `rgba(87, 217, 163, 0.12)`
- Code surface: `#0d0d0c`

## 4. Typography

Use the existing site sans font. Do not introduce custom brand fonts unless the whole site font setup changes.

- Hero title: 44-56px, 700, tight line-height, slight negative tracking.
- Page title: 36-48px, 700, tight line-height.
- Article title: 40-56px, 700, tight line-height, optimized for Chinese and English.
- Section heading: 20-28px, 650-700.
- Body: 16-18px, 400, relaxed line-height.
- Metadata: 12-14px, 500, muted.
- Code and technical labels: use monospace only when the content is actually technical.

Do not use oversized marketing typography inside compact blog cards or sidebars.

## 5. Blog Index

The blog index should behave like a reading archive, not a marketing grid.

- Header: compact editorial introduction.
- Add a subtle label such as "Blog" or "Writing" above the title.
- Use a restrained two-column layout on large screens, single column on mobile.
- Blog cards should use a clean split: thumbnail, title, description, metadata, categories.
- Avoid full-card image color overlays that reduce title readability.
- Card radius: 16px or less.
- Card border: subtle warm border.
- Card hover: slight border/accent shift and tiny translate only.
- Keep metadata visible without relying on hover.

## 6. Blog Card

Cards should support fast scanning.

- Image ratio: 16:9.
- Image radius: 12px.
- Title: 18-20px, semibold/bold.
- Description: 14-15px, muted, clamp to 2-3 lines.
- Metadata row: date, category, views, reading time.
- Category treatment: small pill, green tint or warm neutral tint.
- Do not set text color from image palette; preserve consistent contrast.

## 7. Article Page

The article page is the core experience.

- Use a centered reading column, max width around 720px.
- Keep TOC on the left for large screens, reactions on the right.
- Header should place metadata above title.
- Title and description should appear before the hero image.
- Hero image should be clean, rounded 16-20px, with a subtle border.
- Remove blurred image glow effects; they make reading pages feel heavier.
- Body text should have generous paragraph spacing and comfortable line length.
- Related posts can remain as cards, but should be visually quieter than the article.

## 8. Prose

Long-form content must be comfortable in both Chinese and English.

- Paragraph line-height: 1.85 for Chinese-heavy content.
- Links: accent green, underline with subtle decoration.
- Inline code: warm muted surface, small radius, no heavy block.
- Code blocks: dark, readable, rounded 14-16px, subtle border.
- Blockquotes: warm surface or transparent, green left border, no loud quote styling.
- Headings need enough top margin to act as section anchors.
- Images in prose should be rounded and bordered, with captions muted.

## 9. Navigation And Sidebars

- The existing site navigation can keep its current identity.
- Blog-only sidebars should be quieter and more editorial.
- TOC should have a small uppercase label, thin vertical rhythm, and clear active state.
- Reactions should be visible but not playful enough to dominate the article.

## 10. Responsive Rules

- Mobile blog cards stack image above text.
- Mobile article header should avoid cramped metadata rows; wrap naturally.
- Hide left/right sidebars below large screens.
- Keep touch targets at least 40px.
- No text may overlap images, buttons, cards, or adjacent content.

## 11. Do

- Keep the page calm and readable.
- Prefer warm neutrals to cold grays.
- Use green as a functional accent.
- Make metadata and categories scannable.
- Preserve existing content, routes, and data behavior.

## 12. Do Not

- Do not make the blog look like a landing page.
- Do not use large gradients, decorative blobs, or noisy backgrounds in the article body.
- Do not rely on image-dominant cards for text contrast.
- Do not introduce a new UI library for this redesign.
- Do not use one-note saturated green everywhere.
