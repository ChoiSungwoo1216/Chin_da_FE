// user.js


// Actions

const ADD = "user/ADD";
const DELETE = "user/DELETE";

const initialState = {
  list: 
      {
        userId: "1234",
        username: "tjddn8195@naver.com",
        nickname: "최성우",
    },
  new: {}
};

// Action Creators

export function adduser(user) {
  return { type: ADD, user: user };
}

export function deleteuser(user_index) {
  return { type: DELETE, user_index };
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

    case "user/ADD": {
      const new_user_list = [action.user, ...state.list];
      return { new: new_user_list };
    }

    case "user/DELETE": {
      const new_user_list = state.list.filter((l, idx) => {
        return parseInt(action.user_index) !== idx;
      });

      return { new: new_user_list };
    }

    default:
      return state;
  }
}