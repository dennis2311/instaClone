import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT, MESSAGE_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id },
      });
      if (canSee) {
        const room = await prisma.room({ id }).$fragment(ROOM_FRAGMENT);
        const messages = await prisma
          .room({ id })
          .messages()
          .$fragment(MESSAGE_FRAGMENT);
        return { room, messages };
      } else {
        throw Error("We can't find your room");
      }
    },
  },
};
