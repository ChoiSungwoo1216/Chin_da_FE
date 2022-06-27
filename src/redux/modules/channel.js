// channel.js
//AXIOS
import axios from "axios";
// Actions

const LOAD = "channel/LOAD";
const ADD = "channel/ADD";
const DELETE = "channel/DELETE";

const initialState = {
  list: [
  ],
};

// Action Creators
export function loadchannel(channel_list) {
  return { type: LOAD, channel_list };
}

export function addchannel(channel) {
  return { type: ADD, channel: channel };
}

export function deletechannel(channel_index) {
  return { type: DELETE, channel_index };
}

// // middlewares

export const loadChannelAxios = () => {
  const access_token = localStorage.getItem("access_token")
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channelList",
        method: "get",
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": access_token
        }
      }
    )
      .then(response => {
        console.log(response)
        const axios_data = response.data.list;
        let channel_list = [...axios_data];
        dispatch(loadchannel(channel_list));
      })
      .catch((response) => {
        console.log(response)
        window.alert(response.message)
      });
  }
}


export const AddChaListAxios = (data) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channel",
        method: "post",
        data: data,
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": localStorage.getItem('access_token')
        },
      }
    )
      .then(response => {
        console.log(response)
        const axios_data = response.data.result;
        dispatch(addchannel(axios_data));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

export const AddUserListAxios = (data) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channelInvite",
        method: "post",
        data: data,
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": localStorage.getItem('access_token')
        },
      }
    )
      .then(response => {
        window.alert(response.data.message)
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

export const DelChaListAxios = (index, channelId) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: `/api/channel/${channelId}`,
        method: "delete",
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": localStorage.getItem('access_token')
        },
      }
    )
      .then(response => {
        console.log(response);
        window.alert(response.data.message)
        dispatch(deletechannel(index));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "channel/LOAD": {
      return { list: action.channel_list };
    }

    case "channel/ADD": {
      const new_channel_list = [action.channel, ...state.list];
      return { list: new_channel_list };
    }

    case "channel/DELETE": {
      const new_channel_list = state.list.filter((l, idx) => {
        return parseInt(action.channel_index) !== idx;
      });

      return { list: new_channel_list };
    }

    default:
      return state;
  }
}