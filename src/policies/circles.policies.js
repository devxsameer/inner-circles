// src/policies/circles.policies.js

export const canSeeAuthor = (req) => {
  return Boolean(req.membership);
};

export const canPost = (req) => {
  return Boolean(req.membership);
};

export const canDeletePost = (req, post) => {
  if (!req.user || !req.membership) return false;

  const role = req.membership.role;
  if (role === "owner" || role === "admin") return true;

  return post.authorId === req.user.id;
};

export const canUpdatePost = (req, post) => {
  return Boolean(req.user && req.membership && post.authorId === req.user.id);
};

export const canDeleteCircle = (req) => {
  return req.membership?.role === "owner";
};

export const canManageMembers = (req) => {
  return req.membership?.role === "owner" || req.membership?.role === "admin";
};
