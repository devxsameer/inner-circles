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
-- POSTS (REALISTIC LONG-FORM CONTENT)
-- =====================

-- ===================== Tech Talk (Circle 1)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(1, 1, 'JavaScript Trends 2025',
'Every year we talk about JavaScript trends, and every year it somehow finds new ways to surprise us.
ES14 looks promising, but honestly, half the features feel like they exist because someone at TC39 lost an argument.
Still, improvements to pattern matching and better async handling might actually make our lives easier.
Or maybe we will all still end up writing the same code with prettier syntax.',
'members_only'),

(1, 2, 'Node.js or Deno?',
'I have switched between Node.js and Deno twice this month alone.
Deno feels clean, secure, and modern, but Node still rules the ecosystem.
Most jobs still expect Node, most packages are battle-tested, and production setups are easier.
Deno feels like the future, but Node is the present that pays my bills.',
'public'),

(1, 3, 'AI Coding Tools',
'AI coding tools are great assistants, but terrible teachers.
They speed up boilerplate, suggest patterns, and sometimes even fix bugs.
But if you blindly copy-paste suggestions without understanding them, you are just delaying problems.
AI does not replace developers — it exposes how well you understand fundamentals.',
'members_only'),

(1, 4, 'The Great Framework Debate',
'Every year someone declares a framework dead.
React is too bloated. Vue is too opinionated. Angular is still Angular.
In reality, almost every framework can build great apps if the developer understands the basics.
The best framework is the one your team actually knows.',
'public'),

(1, 6, 'Dev Setup 2025',
'I spent three days tweaking my VS Code setup.
Custom themes, linting rules, shortcuts, and extensions everywhere.
Could I have coded during those three days? Yes.
Do I regret it? Absolutely not. Productivity is 90% placebo anyway.',
'members_only'),

(1, 1, 'TypeScript Tips',
'If you are still afraid of TypeScript, stop writing everything as any.
Types exist to help you reason about your application.
Start small, type your function inputs, and slowly tighten things.
TypeScript is not painful — your codebase is.',
'public');

-- ===================== Book Worms (Circle 2)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(2, 2, 'Best Fantasy Worldbuilding',
'Good fantasy worldbuilding is not about maps or invented languages.
It is about consistency.
Tolkien made Middle-earth feel real because everything followed internal logic.
Magic has rules, history has consequences, and nothing exists just for convenience.',
'members_only'),

(2, 1, 'What Are You Reading?',
'I recently finished Atomic Habits, and while some ideas feel repetitive,
it genuinely helped me rethink system-based habits.
Small improvements compound faster than motivation.
Curious what everyone else is reading this month.',
'public'),

(2, 4, 'Book of the Month',
'I propose we vote on a classic this month.
Nothing too heavy, but something that sparks discussion.
Drop your suggestions below, and we will shortlist the top picks.',
'members_only'),

(2, 6, 'Top Mystery Novels',
'Mystery novels work best when the reader feels clever at the end.
Not confused, not cheated — just surprised.
Some modern thrillers focus too much on shock value.
A good mystery respects the reader.',
'public');

-- ===================== Night Owls (Circle 3)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(3, 3, 'Late Night Productivity',
'I do my best work between 1 AM and 3 AM.
No notifications, no distractions, just silence.
The downside is that society expects you to function at 9 AM.
Being a night owl is productive but poorly rewarded.',
'members_only'),

(3, 1, 'Who Else is Awake?',
'If you are reading this at 2 AM, welcome to the club.
Tomorrow is already ruined, but at least tonight is peaceful.',
'public'),

(3, 5, 'Midnight Snacks',
'There is something magical about eating food at midnight.
Noodles taste better. Snacks feel illegal.
Nutrition experts would be disappointed, but happiness matters too.',
'public');

-- ===================== Fitness Squad (Circle 4)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(4, 4, 'Leg Day Motivation',
'Leg day is the most honest workout.
There is no cheating, only suffering.
Skipping leg day shows in your balance, posture, and discipline.
Embrace the pain. Walk funny tomorrow.',
'members_only'),

(4, 5, 'Protein Shakes 101',
'Protein shakes are supplements, not magic.
They help fill gaps, not replace meals.
Choose something you can digest and actually enjoy, or you will quit.
Consistency beats optimization.',
'public'),

(4, 3, 'Gym Fails Compilation',
'Everyone has gym fail stories.
Dropping weights, slipping on treadmills, or misjudging form.
Laugh, learn, and come back stronger.',
'public');

-- ===================== Travel Addicts (Circle 5)
INSERT INTO posts (circle_id, author_id, title, body, visibility) VALUES
(5, 5, 'Dream Destinations 2025',
'Japan has been on my list for years.
The mix of tradition and technology fascinates me.
From quiet temples to neon cities, it feels like another world.',
'public'),

(5, 3, 'Travel on a Budget',
'Traveling cheap is not about suffering.
It is about prioritizing experiences over luxury.
Street food, public transport, and hostels can be life-changing if you stay open-minded.',
'members_only'),

(5, 7, 'Why Travel Matters',
'Travel changes how you see people.
It slows you down, humbles you, and teaches empathy.
You realise how small your problems are once you leave familiar places.',
'members_only');
