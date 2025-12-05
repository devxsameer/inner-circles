// src/policies/circles.polices.js
export const canSeeAuthor = async (req) => {
  return !!req.membership;
};

export const canPost = (req) => {
  return !!req.membership;
};

export const canDeletePost = (req, post) => {
  if (!req.user) return false;
  if (!req.membership) return false;

  const role = req.membership.role;
  if (role === "owner" || role === "admin") return true;
  return post.author_id === req.user.id;
};

export const canManageMembers = (req) => {
  return !!req.membership && req.membership.role === "owner";
};
