import { createContext, useContext, useEffect, useState,} from "react";

import { io } from "socket.io-client";

import { useAuthContext } from "./AuthContext";
import useConversation from "../zustand/useConversation";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastSeenUsers, setLastSeenUsers] = useState({});
  const [typingUsers, setTypingUsers] = useState([]);

  const { authUser } = useAuthContext();

  const updateMessageStatus = useConversation(
    (state) => state.updateMessageStatus
  );

  const updateMessage = useConversation(
    (state) => state.updateMessage
  );

  const removeMessage = useConversation(
    (state) => state.removeMessage
  );

  useEffect(() => {
    if (!authUser?._id) {
      setSocket(null);
      setOnlineUsers([]);
      setLastSeenUsers({});
      setTypingUsers([]);
      return;
    }

    const socket = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: authUser._id,
      },
    });

    setSocket(socket);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.log(
        "Socket connection error:",
        error.message
      );
    });

    // Online users
    socket.on("getOnlineUsers", (users) => {
      console.log("Online users:", users);

      setOnlineUsers(users);
    });

    // Last seen
    socket.on("userLastSeen", ({ userId, lastSeen }) => {
      console.log(
        "User last seen:",
        userId,
        lastSeen
      );

      setLastSeenUsers((prev) => ({
        ...prev,
        [userId]: lastSeen,
      }));
    });

    // Message delivered
    socket.on("messageDelivered", ({ messageId }) => {
      console.log(
        "Message delivered:",
        messageId
      );

      updateMessageStatus(
        messageId,
        "delivered"
      );
    });

    // Message read
    socket.on("messageRead", ({ messageIds }) => {
      console.log(
        "Messages read:",
        messageIds
      );

      messageIds.forEach((messageId) => {
        updateMessageStatus(
          messageId,
          "read"
        );
      });
    });

    // Message edited
    socket.on("messageEdited", ({ message }) => {
      console.log(
        "Message edited:",
        message
      );

      updateMessage(message);
    });

    // Message deleted
    socket.on("messageDeleted", ({ messageId }) => {
      console.log(
        "Message deleted:",
        messageId
      );

      removeMessage(messageId);
    });

    // User typing
    socket.on("userTyping", ({ senderId }) => {
      setTypingUsers((prev) => {
        if (prev.includes(senderId)) {
          return prev;
        }

        return [...prev, senderId];
      });
    });

    // User stopped typing
    socket.on(
      "userStoppedTyping",
      ({ senderId }) => {
        setTypingUsers((prev) =>
          prev.filter(
            (userId) => userId !== senderId
          )
        );
      }
    );

    return () => {
      socket.close();

      setSocket(null);
      setOnlineUsers([]);
      setLastSeenUsers({});
      setTypingUsers([]);
    };
  }, [
    authUser?._id,
    updateMessageStatus,
    updateMessage,
    removeMessage,
  ]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        lastSeenUsers,
        typingUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;