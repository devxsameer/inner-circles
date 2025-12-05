-- =====================
-- USERS
-- =====================
INSERT INTO users (username, password_hash) VALUES
('alice', '$2a$12$Lnfy0hSG0xQtFJDshOFNUe44Wc0gbfHWKWchPos3fY7cgl1O35CPu'),
('bob', '$2a$12$EPpG5gvyrjNdNLw8XUcb0O4WGYoHH0BVrXFJ0Mi/Ot7XCPy3Px0WC'),
('charlie', '$2a$12$ttxZhEH3kIgZxCOHCixET.uy97BcdvATO3OYAsgqWicIffAfsj.oC'),
('diana', '$2a$12$SzQW1bJz.efeNa9SLWNNWe96ydbdAaEpWcvk.UhvdGNXqHyZyBFQa'),
('eric', '$2a$12$i0NlNodPaZRh9eAPpMzjVe/KtYxzDbbzrO10sKcuhcBWWHWg87VM2');

-- =====================
-- CIRCLES
-- =====================
INSERT INTO circles (name, owner_id) VALUES
('Tech Talk', 1),
('Book Worms', 2),
('Night Owls', 3);

-- =====================
-- CIRCLE MEMBERS
-- =====================
-- Tech Talk
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(1, 1, 'owner'),
(2, 1, 'member'),
(3, 1, 'member'),
(4, 1, 'member');

-- Book Worms
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(2, 2, 'owner'),
(1, 2, 'member'),
(4, 2, 'member'),
(5, 2, 'member');

-- Night Owls
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(3, 3, 'owner'),
(1, 3, 'member'),
(2, 3, 'member'),
(5, 3, 'member');

-- =====================
-- POSTS (min 20 posts)
-- =====================

INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
-- Tech Talk (Circle 1)
(1, 1, 'JavaScript Trends 2025', 'ES14 is coming, and yes... more array methods.', 'members_only'),
(1, 2, 'Node.js or Deno?', 'I switched twice today. Help.', 'members_only'),
(1, 3, 'Frontend Framework Fatigue', 'React 20? Vue 10? I give up.', 'public'),
(1, 4, 'AI Tools for Devs', 'ChatGPT is still my senior dev.', 'members_only'),
(1, 1, 'Best VS Code Extensions', 'Here''s my 2025 setup.', 'public'),
(1, 3, 'TypeScript Tips', 'Never trust "any".', 'members_only'),
(1, 2, 'Debugging Horror Story', 'I spent 2 hours debugging a missing semicolon.', 'public'),

-- Book Worms (Circle 2)
(2, 2, 'Best Fantasy Worldbuilding', 'Tolkien still unmatched.', 'members_only'),
(2, 1, 'What Are You Reading?', 'Currently reading Atomic Habits.', 'public'),
(2, 4, 'Book of the Month', 'Let''s pick a classic!', 'members_only'), -- <-- This is the line you asked about
(2, 5, 'Underrated Authors', 'Here are 5 you should know.', 'public'),
(2, 4, 'Reading Challenge 2025', 'Goal: 24 books this year!', 'members_only'),
(2, 1, 'Audiobooks vs Reading', 'Do audiobooks count?', 'public'),
(2, 5, 'Favorite Quotes', 'Share your best ones.', 'members_only'),

-- Night Owls (Circle 3)
(3, 3, 'Late Night Productivity', '2 AM is my peak.', 'members_only'),
(3, 1, 'Who Else is Awake?', 'Sleep schedule destroyed.', 'public'),
(3, 2, 'Night Coding Sessions', 'Dark mode is mandatory.', 'members_only'),
(3, 5, 'Midnight Snacks', 'Popcorn or noodles?', 'public'),
(3, 3, 'Stargazing Tonight', 'Clear skies tonight!', 'members_only'),
(3, 1, 'Why Does Time Fly at Night?', 'One minute it''s 10 PM...', 'members_only'),
(3, 2, 'Night Owl Life Hacks', 'Step 1: embrace chaos.', 'public');