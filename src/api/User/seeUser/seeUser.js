import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: (_, args, { request, isAuthenticated }) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
