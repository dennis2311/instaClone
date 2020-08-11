import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, receiverId } = args;
      let room;
      let existingRooms;
      if (roomId === undefined) {
        if (receiverId !== user.id) {
          existingRooms = await prisma.rooms({
            where: {
              AND: [
                { participants_some: { id_in: user.id } },
                { participants_some: { id_in: receiverId } },
              ],
            },
          });
          if (existingRooms.length !== 0) {
            room = await prisma
              .room({ id: existingRooms[0].id })
              .$fragment(ROOM_FRAGMENT);
          } else {
            room = await prisma
              .createRoom({
                participants: {
                  connect: [{ id: receiverId }, { id: user.id }],
                },
              })
              .$fragment(ROOM_FRAGMENT);
          }
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getReceiverId = room.participants.filter(
        (participants) => participants.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id },
        },
        to: {
          connect: {
            id: roomId ? getReceiverId.id : receiverId,
          },
        },
        room: {
          connect: {
            id: room.id,
          },
        },
      });
    },
  },
};
