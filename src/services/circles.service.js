// src/services/circles.service.js
import {
  addMemberInDb,
  changeRoleInDb,
  createCircleInDb,
  deleteCircleFromDb,
  getAllCirclesFromDb,
  getCircleByIdFromDb,
  getCirclesOwnedByUserFromDb,
  getCirclesUserIsMemberOfFromDb,
  getMembershipFromDb,
  getMembershipsInCircleFromDb,
  getPopularCirclesFromDb,
  insertOwnerAsMemberInDb,
  removeMemberFromDb,
  updateCircleInDb,
} from "../models/circles.model.js";
import { getUserByUsernameFromDb } from "../models/users.model.js";
import { ROLES } from "../utils/constants.js";

/* -------------------------------------------------------
   CREATE CIRCLE (with owner as member)
------------------------------------------------------- */
export async function createCircle({ name, description, ownerId }) {
  const circle = await createCircleInDb({ name, description, ownerId });

  // Automatically add owner as member
  await insertOwnerAsMemberInDb({
    ownerId,
    circleId: circle.id,
  });

  return circle;
}
export async function updateCircle({ name, description, circleId }) {
  const circle = await updateCircleInDb({ name, description, circleId });

  return circle;
}

/* -------------------------------------------------------
   GET ALL CIRCLES
------------------------------------------------------- */
export async function getAllCircles() {
  return await getAllCirclesFromDb();
}

export async function getCirclesOwnedByUser(userId) {
  return await getCirclesOwnedByUserFromDb({ userId });
}

export async function getCirclesUserIsMemberOf(userId) {
  return await getCirclesUserIsMemberOfFromDb({ userId });
}

export async function getPopularCircles(limit = 6) {
  return await getPopularCirclesFromDb(limit);
}

/* -------------------------------------------------------
   GET ONE CIRCLE
------------------------------------------------------- */
export async function getCircleById(id) {
  return await getCircleByIdFromDb({ id });
}

/* -------------------------------------------------------
   DELETE CIRCLE
------------------------------------------------------- */
export async function deleteCircle(circleId) {
  return await deleteCircleFromDb({ circleId });
}

/* -------------------------------------------------------
   MEMBERSHIP QUERIES
------------------------------------------------------- */
export async function getMembership(userId, circleId) {
  return await getMembershipFromDb({ userId, circleId });
}

export async function getMembershipsInCircle(circleId) {
  return await getMembershipsInCircleFromDb({ circleId });
}

export async function removeMember({
  circleId,
  actorUserId,
  actorRole,
  targetUserId,
}) {
  const targetMembership = await getMembershipFromDb({
    userId: targetUserId,
    circleId,
  });

  if (!targetMembership) {
    throw new Error("User is not a member of this circle");
  }

  // 🚫 Owner cannot remove themselves
  if (actorRole === ROLES.OWNER && actorUserId === targetUserId) {
    throw new Error("Owner cannot remove themselves");
  }

  // 🚫 Admin restrictions
  if (actorRole === ROLES.ADMIN) {
    if (targetMembership.role === ROLES.OWNER) {
      throw new Error("Admin cannot remove owner");
    }
    if (targetMembership.role === ROLES.ADMIN) {
      throw new Error("Admin cannot remove another admin");
    }
  }

  return await removeMemberFromDb({
    circleId,
    userId: targetUserId,
  });
}

export async function changeRole({
  circleId,
  actorUserId,
  actorRole,
  targetUserId,
  newRole,
}) {
  const targetMembership = await getMembershipFromDb({
    userId: targetUserId,
    circleId,
  });

  console.log({ targetUserId, circleId });
  if (!targetMembership) {
    throw new Error("User is not a member of this circle");
  }

  // 🚫 Owner role is immutable
  if (targetMembership.role === ROLES.OWNER) {
    throw new Error("Owner role cannot be changed");
  }

  // 🚫 Admin rules
  if (actorRole === ROLES.ADMIN) {
    // Admin can only promote/demote MEMBERS
    if (targetMembership.role !== ROLES.MEMBER) {
      throw new Error("Admin can only manage members");
    }

    if (newRole === ROLES.MEMBER) {
      throw new Error("Admin cannot demote admins");
    }
  }

  // 🚫 Owner cannot demote themselves
  if (
    actorRole === ROLES.OWNER &&
    actorUserId === targetUserId &&
    newRole === ROLES.MEMBER
  ) {
    throw new Error("Owner cannot change their own role");
  }

  return await changeRoleInDb({
    circleId,
    userId: targetUserId,
    role: newRole,
  });
}

export async function addMemberByUsername({
  circleId,
  actorUserId,
  actorRole,
  username,
}) {
  // Only owner or admin allowed (double safety)
  if (![ROLES.OWNER, ROLES.ADMIN].includes(actorRole)) {
    throw new Error("Not allowed to add members");
  }

  // Find user by username
  const user = await getUserByUsernameFromDb(username);

  if (!user) {
    throw new Error("User does not exist");
  }

  // Prevent re-adding members
  const existingMembership = await getMembershipFromDb({
    userId: user.id,
    circleId,
  });

  if (existingMembership) {
    throw new Error("User is already a member of this circle");
  }

  // Owner cannot be added via form (already exists)
  if (user.id === actorUserId && actorRole === ROLES.OWNER) {
    throw new Error("Owner is already a member");
  }

  // ✅ Add as member
  return await addMemberInDb({
    circleId,
    userId: user.id,
    role: ROLES.MEMBER,
  });
}
