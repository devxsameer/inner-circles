-- =====================
-- USERS
-- =====================
INSERT INTO users (username, password_hash) VALUES
('alice', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('bob', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('charlie', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('diana', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('eric',  '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('fiona', '$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.'),
('george','$2a$12$XE2GPxm4oBojKhTNOznjwu6bTOBD/LESR1OUrPmP2b8V5dPZsBNM.');

-- =====================
-- CIRCLES
-- =====================
INSERT INTO circles (name, owner_id, description) VALUES
('Tech Talk',     1, 'A circle for developers, tech lovers, and people who pretend to understand TypeScript.'),
('Book Worms',    2, 'A peaceful reading corner for fiction fans, fantasy nerds, and quote collectors.'),
('Night Owls',    3, 'A circle for people who thrive at 2 AM and regret it at 8 AM.'),
('Fitness Squad', 4, 'A group for gym lovers, beginners, and people who bought a treadmill but use it as a clothes hanger.'),
('Travel Addicts',5, 'A community for wanderers who love airports, mountains, and overpriced coffee.');

-- =====================
-- CIRCLE MEMBERS
-- =====================

-- Tech Talk
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(1, 1, 'owner'),
(2, 1, 'admin'),
(3, 1, 'member'),
(4, 1, 'member'),
(5, 1, 'member'),
(6, 1, 'member');

-- Book Worms
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(2, 2, 'owner'),
(1, 2, 'member'),
(4, 2, 'admin'),
(5, 2, 'member'),
(6, 2, 'member'),
(7, 2, 'member');

-- Night Owls
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(3, 3, 'owner'),
(1, 3, 'admin'),
(2, 3, 'member'),
(5, 3, 'member'),
(6, 3, 'member'),
(7, 3, 'member');

-- Fitness Squad
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(4, 4, 'owner'),
(1, 4, 'member'),
(2, 4, 'member'),
(3, 4, 'member'),
(5, 4, 'admin'),
(6, 4, 'member');

-- Travel Addicts
INSERT INTO circle_members (user_id, circle_id, role) VALUES
(5, 5, 'owner'),
(1, 5, 'member'),
(2, 5, 'member'),
(3, 5, 'admin'),
(4, 5, 'member'),
(7, 5, 'member');

-- =====================
-- POSTS (30+ posts)
-- =====================

-- ===================== Tech Talk (Circle 1)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(1, 1, 'JavaScript Trends 2025', 'ES14 might add features nobody asked for… again.', 'members_only'),
(1, 2, 'Node.js or Deno?', 'Deno is cute, Node.js is home. Fight me.', 'public'),
(1, 3, 'AI Coding Tools', 'AI will not take your job—just your ability to think.', 'members_only'),
(1, 4, 'The Great Framework Debate', 'React 20? Vue 10? Angular still exists??', 'public'),
(1, 6, 'Dev Setup 2025', 'I spent 3 days configuring VS Code. Worth it.', 'members_only'),
(1, 1, 'TypeScript Tips', '99% of TS errors can be fixed by… any.', 'public'),
(1, 5, 'Best Dev Podcasts', 'Here are my weekly favorites.', 'members_only'),
(1, 3, 'Git Blunders', 'Accidentally pushed to main again.', 'public'),
(1, 2, 'Performance Optimization', '50% of performance issues are JSON.', 'members_only'),
(1, 4, 'Dark Mode Forever', 'Light mode users scare me.', 'public');

-- ===================== Book Worms (Circle 2)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(2, 2, 'Best Fantasy Worldbuilding', 'Tolkien still unmatched.', 'members_only'),
(2, 1, 'What Are You Reading?', 'Currently reading Atomic Habits.', 'public'),
(2, 4, 'Book of the Month', 'Let''s vote on classics!', 'members_only'),
(2, 6, 'Top Mystery Novels', 'My recommendations for thriller lovers.', 'public'),
(2, 7, 'Reading in 2025', 'My goal: 30 books!', 'members_only'),
(2, 5, 'Underrated Authors', 'Give these writers some love.', 'public'),
(2, 4, 'Library or Kindle?', 'Is digital reading cheating?', 'members_only'),
(2, 1, 'Do Audiobooks Count?', 'Yes. Fight me.', 'public'),
(2, 7, 'Book Quotes I Love', '“Not all those who wander…”', 'members_only'),
(2, 6, 'Comfy Reading Spots', 'The couch wins.', 'public');

-- ===================== Night Owls (Circle 3)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(3, 3, 'Late Night Productivity', '2 AM is when my brain wakes up.', 'members_only'),
(3, 1, 'Who Else is Awake?', 'Sleep schedule destroyed.', 'public'),
(3, 2, 'Night Coding Sessions', 'Dark mode mandatory.', 'members_only'),
(3, 5, 'Midnight Snacks', 'Popcorn or noodles?', 'public'),
(3, 7, 'Stargazing Tonight', 'Sky is clear!', 'members_only'),
(3, 3, 'Why Time Flies at Night', '10 PM → 3 AM instantly.', 'public'),
(3, 6, 'Night Owl Problems', 'Morning people are my enemy.', 'members_only'),
(3, 2, 'Energy Drink Tier List', 'S-tier: the blue one.', 'public'),
(3, 1, 'All-Nighter Hacks', 'Step 1: do not do it.', 'members_only'),
(3, 5, 'Best Late Night Playlists', 'Lofi saves lives.', 'public');

-- ===================== Fitness Squad (Circle 4)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(4, 4, 'Leg Day Motivation', 'If you know, you know.', 'members_only'),
(4, 5, 'Protein Shakes 101', 'Not all shakes are equal.', 'public'),
(4, 1, 'Home Workout Guide', 'No equipment needed.', 'members_only'),
(4, 3, 'Gym Fails Compilation', 'We have all been there.', 'public'),
(4, 2, 'Cardio Routine 2025', 'Running is not that bad (kinda).', 'members_only'),
(4, 6, 'Stretching Basics', 'Warm up or regret later.', 'public'),
(4, 4, 'My Transformation Story', 'Slow progress is still progress.', 'members_only'),
(4, 5, 'Supplements Guide', 'Creatine is king.', 'public'),
(4, 1, 'Workout Playlists', 'Music = PR boost.', 'members_only'),
(4, 3, 'Gym Habits That Work', 'Consistency > intensity.', 'public');

-- ===================== Travel Addicts (Circle 5)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(5, 5, 'Dream Destinations 2025', 'Japan tops my list!', 'public'),
(5, 3, 'Travel on a Budget', 'How I spent 7 days for $200.', 'members_only'),
(5, 7, 'Airport Survival Tips', 'Pack light, walk fast.', 'public'),
(5, 4, 'Mountain Adventures', 'Himalayas were stunning.', 'public'),
(5, 2, 'Solo Travel Safety', 'Trust your instincts.', 'members_only'),
(5, 1, 'Food Destinations', 'Italy changed me.', 'members_only'),
(5, 6, 'Hostel Life', 'You meet the best people.', 'public'),
(5, 5, 'Road Trip Essentials', 'Snacks are mandatory.', 'members_only'),
(5, 2, 'Travel Photography Tips', 'Golden hour is magic.', 'public'),
(5, 7, 'Why Travel Matters', 'It teaches you more than school.', 'members_only');
