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
} from "../models/circles.model.js";

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

export async function addMember(circleId, userId, role = "member") {
  return await addMemberInDb({ circleId, userId, role });
}

export async function removeMember(circleId, userId) {
  return await removeMemberFromDb({ circleId, userId });
}

export async function changeRole(circleId, userId, role) {
  return await changeRoleInDb({ circleId, userId, role });
}
