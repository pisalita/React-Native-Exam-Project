import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chatroom } from "../interfaces/IChatroom";

const url =
  "https://rn-exam-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

const fetchChatrooms = async (token: any) => {
  const response = await fetch(url + token.queryKey[1]);
  const data = await response.json();
  let chatrooms: Chatroom[] = [];

  for (const key in data) {
    const obj = data[key];
    chatrooms.push({ id: key, title: obj.title, messages: obj.messages });
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
