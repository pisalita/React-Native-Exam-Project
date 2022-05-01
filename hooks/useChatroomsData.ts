import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chatroom } from "../interfaces/IChatroom";
import { User } from "../interfaces/IUser";

const url =
  "https://rn-exam-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

const fetchChatrooms = async (token: any) => {
  const response = await fetch(url + token.queryKey[1]);
  const data = await response.json();
  let chatrooms: Chatroom[] = [];
  let messages: any = [];

  for (const key in data) {
    const obj = data[key];

    //empty the messages array so the messages from prior chatrooms does not get pushed to the next chatroom!
    messages = [];

    for (const key in obj.messages) {
      const message = obj.messages[key];
      messages.push({
        id: key,
        message: message.message,
        user: message.user,
        timestamp: message.timestamp,
      });
    }

    chatrooms.push({
      id: key,
      title: obj.title,
      messages: messages,
    });
  }
  return chatrooms;
};

const addChatroom = async ({
  chatroom,
  token,
}: {
  chatroom: Chatroom;
  token: string;
}) => {
  await fetch(url + token, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...chatroom,
    }),
  });
};

const addChatroomMessage = async ({
  id,
  messages,
  token,
}: {
  id: string;
  messages: { message: string; user: User; timestamp?: Date };
  token: string;
}) => {
  await fetch(
    `https://rn-exam-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${id}/messages.json?auth=` +
      token,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...messages,
      }),
    }
  );
};

export const useChatroomsData = (token: any) => {
  return useQuery(["chatrooms", token], fetchChatrooms);
};

export const useAddChatroomsData = () => {
  const queryClient = useQueryClient();
  return useMutation(addChatroom, {
    onSuccess: () => {
      //making the useQuery refetch after posting a new chatroom via useMutate from react query
      queryClient.invalidateQueries("chatrooms");
    },
  });
};

export const useAddChatroomMessage = () => {
  const queryClient = useQueryClient();
  return useMutation(addChatroomMessage, {
    onSuccess: () => {
      //making the useQuery refetch after posting a new chatroom via useMutate from react query
      queryClient.invalidateQueries("chatrooms");
    },
  });
};
