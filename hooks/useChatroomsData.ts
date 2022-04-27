import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Chatroom } from "../interfaces/IChatroom";

const url =
  "https://rn-exam-project-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json?auth=";

const fetchChatrooms = async () => {
  const token = useSelector((state: RootState) => state.user.user?.idToken);
  const response = await fetch(url + token);
  const data = await response.json();
  let chatrooms: Chatroom[] = [];

  for (const key in data) {
    const obj = data[key];
    chatrooms.push({ id: key, title: obj.title, messages: obj.messages });
  }

  return chatrooms;
};

const addChatroom = async ({ chatroom }: { chatroom: Chatroom }) => {
  const token = useSelector((state: RootState) => state.user.user?.idToken);
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
