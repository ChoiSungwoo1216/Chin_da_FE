// user.js

// Actions

const EDIT = "sound/EDIT";
const UPDATE = "selected/UPDATE";
const ALREADY = "already/ALREADY";

const initialState = {
  list: [{}],
  sound: { bgm: 0.1, es: 0.5 },
  selected: { language: "", level: "" },
  already: { user: false, opp: false },
};

// Action Creators

// export function adduser(user) {
//   return { type: ADD, user: user };
// }

export function editsound(sound) {
  return { type: EDIT, sound };
}

export function updateselected(selected) {
  return { type: UPDATE, selected };
}

export function alreadyUser(user) {
  return { type: ALREADY, user };
}

// export function deleteuser(user_index) {
//   return { type: DELETE, user_index };
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // case "user/ADD": {
    //   const new_user_list = [action.user, ...state.list];
    //   return { new: new_user_list };
    // }

    // case "user/DELETE": {
    //   const new_user_list = state.list.filter((l, idx) => {
    //     return parseInt(action.user_index) !== idx;
    //   });

    //   return { new: new_user_list };
    // }

    case "sound/EDIT": {
      const edit_sound_list = { ...state.sound, ...action.sound };
      return { ...state, sound: edit_sound_list };
    }

    case "selected/UPDATE": {
      const update_selected_list = { ...state.selected, ...action.selected };
      return { ...state, selected: update_selected_list };
    }
    case ALREADY: {
      const Already_list = {
        ...state.already,
        ...action.user,
      };
      return { ...state, already: Already_list };
    }
    default:
      return state;
  }
}
