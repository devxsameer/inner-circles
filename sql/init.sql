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
  owner_id INT NOT NULL 
      REFERENCES users(id) 
      ON DELETE CASCADE 
      DEFERRABLE INITIALLY IMMEDIATE,

  description TEXT,
  members_count INT DEFAULT 1, 

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- Circle Members table
-- ==========================
CREATE TABLE IF NOT EXISTS circle_members (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

  user_id INT NOT NULL 
      REFERENCES users(id) 
      ON DELETE CASCADE 
      DEFERRABLE INITIALLY IMMEDIATE,

  circle_id INT NOT NULL 
      REFERENCES circles(id) 
      ON DELETE CASCADE 
      DEFERRABLE INITIALLY IMMEDIATE,

  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (user_id, circle_id),
  CHECK (role IN ('owner', 'admin', 'member'))
);

-- ==========================
-- Posts table
-- ==========================
CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

  circle_id INT NOT NULL 
      REFERENCES circles(id) 
      ON DELETE CASCADE 
      DEFERRABLE INITIALLY IMMEDIATE,

  author_id INT NOT NULL 
      REFERENCES users(id) 
      ON DELETE CASCADE 
      DEFERRABLE INITIALLY IMMEDIATE,

  title VARCHAR(150) NOT NULL,
  body TEXT NOT NULL,

  visibility VARCHAR(30) DEFAULT 'members_only',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  edited_at TIMESTAMP,

  CHECK (visibility IN ('public', 'members_only'))
);

-- ==========================
-- Indexes
-- ==========================
CREATE INDEX IF NOT EXISTS idx_posts_circle 
  ON posts(circle_id);

CREATE INDEX IF NOT EXISTS idx_memberships_user 
  ON circle_members(user_id);

CREATE INDEX IF NOT EXISTS idx_memberships_circle 
  ON circle_members(circle_id);

-- ==========================
-- TRIGGER: Update edited_at when post changes
-- ==========================
CREATE OR REPLACE FUNCTION update_edited_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.edited_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_edited_at
BEFORE UPDATE ON posts
FOR EACH ROW
WHEN (OLD.title IS DISTINCT FROM NEW.title 
   OR OLD.body IS DISTINCT FROM NEW.body)
EXECUTE FUNCTION update_edited_timestamp();

-- ==========================
-- TRIGGERS: Maintain members_count
-- ==========================
CREATE OR REPLACE FUNCTION update_members_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE circles
    SET members_count = members_count + 1
    WHERE id = NEW.circle_id;

  ELSIF TG_OP = 'DELETE' THEN
    UPDATE circles
    SET members_count = members_count - 1
    WHERE id = OLD.circle_id;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER members_count_inc
AFTER INSERT ON circle_members
FOR EACH ROW
EXECUTE FUNCTION update_members_count();

CREATE TRIGGER members_count_dec
AFTER DELETE ON circle_members
FOR EACH ROW
EXECUTE FUNCTION update_members_count();
