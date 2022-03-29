import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chatroom } from "../interfaces/IChatroom";

const url =
  "https://rn-exam-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json";

const fetchChatrooms = async () => {
  const response = await fetch(url);
  return response.json();
};

const addChatroom = async (chatroom: Chatroom) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...chatroom,
    }),
  });
  if (response.ok) {
  }
};

export const useChatroomsData = () => {
  return useQuery("chatrooms", fetchChatrooms);
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
