-- Update the menu_items table to allow 'egg' type
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_type_check;

ALTER TABLE menu_items ADD CONSTRAINT menu_items_type_check 
CHECK (type IN ('veg', 'non-veg', 'egg'));