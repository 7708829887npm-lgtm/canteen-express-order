-- Add ingredients column to menu_items table
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS ingredients TEXT;