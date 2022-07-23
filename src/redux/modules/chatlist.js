// chatlist.js

// Actions

const ADD = "chatlist/ADD";
const DELETE = "chatlist/DELETE";

const initialState = {
  list: [],
};

// Action Creators

export function addchatlist(chatlist) {
  return { type: ADD, chatlist: chatlist };
}
export function deletechatlist() {
  return { type: DELETE };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case "chatlist/ADD": {
      const new_chatlist_list = [action.chatlist, ...state.list];
      return { list: new_chatlist_list };
    }

    case "chatlist/DELETE":{
      const new_post_list = []
      return { list: new_post_list };
    }
    default:

      return state;
  }
}