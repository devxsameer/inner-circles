-- sql/init.sql

-- ==========================
-- Users table
-- ==========================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Circles table
-- ==========================
CREATE TABLE IF NOT EXISTS circles (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100) UNIQUE NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT, -- Improvement #2
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Circle members
-- ==========================
CREATE TABLE IF NOT EXISTS circle_members (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  circle_id INT NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, circle_id)
);

-- ==========================
-- Posts inside circles
-- ==========================
CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  circle_id INT NOT NULL REFERENCES circles(id) ON DELETE CASCADE,
  author_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL,

  visibility VARCHAR(30) DEFAULT 'members_only',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  edited_at TIMESTAMP,

  CHECK (visibility IN ('public', 'members_only'))
);

-- ==========================
-- INDEXES 
-- ==========================
CREATE INDEX IF NOT EXISTS idx_posts_circle ON posts(circle_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON circle_members(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_circle ON circle_members(circle_id);

-- ==========================
-- TRIGGER: Auto-update edited_at 
-- ==========================

-- 1. Create function
CREATE OR REPLACE FUNCTION update_edited_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.edited_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Attach trigger to posts table
CREATE TRIGGER set_edited_at
BEFORE UPDATE ON posts
FOR EACH ROW
WHEN (OLD.title IS DISTINCT FROM NEW.title OR OLD.body IS DISTINCT FROM NEW.body)
EXECUTE FUNCTION update_edited_timestamp();
