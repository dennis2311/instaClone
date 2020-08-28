export const USER_FRAGMENT = `
    id
    username
    email
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user{
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants{
            ${USER_FRAGMENT}
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    fragment MessageParts on Message {
        id
        text
        from{
            ${USER_FRAGMENT}
        }
        to{
            ${USER_FRAGMENT}
        }
    }
`;
