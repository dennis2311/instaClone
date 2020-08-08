import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent; //it takes id in parent and change its name into parentId
      try {
        return prisma.$exists.user({
          AND: [{ id: parentId }, { following_some: { id: user.id } }],
        });
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: {
              id,
            },
          },
        ],
      });
    },
  },
};
