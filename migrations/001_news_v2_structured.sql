-- Adds structured/block-based news support to news_v2.
-- Legacy rows (format='legacy_html') keep being rendered from content_path.
-- New rows (format='structured') use hero_image_path + content_blocks (JSON array of typed blocks).
-- New block types can be added later without further migrations.

ALTER TABLE news_v2
  ADD COLUMN format ENUM('legacy_html', 'structured') NOT NULL DEFAULT 'legacy_html' AFTER tags,
  ADD COLUMN hero_image_path VARCHAR(255) NULL AFTER format,
  ADD COLUMN excerpt TEXT NULL AFTER hero_image_path,
  ADD COLUMN content_blocks JSON NULL AFTER excerpt;
