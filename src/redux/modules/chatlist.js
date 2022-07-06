// chatlist.js
//AXIOS
import axios from "axios";

// Actions


const LOAD = "chatlist/LOAD";
const ADD = "chatlist/ADD";
const DELETE = "chatlist/DELETE"

const initialState = {
  list: [
    {iconUrl :"https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg",
message:"hi", nickname:"연습1", },
{iconUrl :"https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg",
message:"bye", nickname:"연습2", }
  ],
};

// Action Creators
export function loadchatlist(chatlist_list) {
  return { type: LOAD, chatlist_list };
}

export function addchatlist(chatlist) {
  return { type: ADD, chatlist: chatlist };
}

export function delchatlist() {
  return { type: DELETE};
}

// // middlewares

export const LoadChatAxios = (channelId) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: `/api/chat/${channelId}`,
        method: "get",
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": localStorage.getItem('access_token')
        },
      }
    )
      .then(response => {
        console.log(response)
        const axios_data = response.data.list;
        let chatlist_list = [...axios_data];
        dispatch(loadchatlist(chatlist_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "chatlist/LOAD": {
      return { list: action.chatlist_list };
    }

    case "chatlist/ADD": {
      const new_chatlist_list = [ action.chatlist, ...state.list];
      return { list: new_chatlist_list };
    }
    case "chatlist/DELETE":{
      const empty_chatlist_list = [];
      return {list: empty_chatlist_list};
    }

    default:
      return state;
  }
}