// chatlist.js

// Actions

const ADD = "chatlist/ADD";

const initialState = {
  list: [],
};

// Action Creators

export function addchatlist(chatlist) {
  return { type: ADD, chatlist: chatlist };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case "chatlist/ADD": {
      const new_chatlist_list = [action.chatlist, ...state.list];
      return { list: new_chatlist_list };
    }
    default:

      return state;
  }
}