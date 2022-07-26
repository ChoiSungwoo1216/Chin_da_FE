// battleFunction.js

// Actions

const ALREADY = "already/ALREADY";

const SWITCH = "switch/SWITCH";

const LEVEL = "level/LEVEL";

const ALERT = "alert/ALERT";

const MSG = "msg/MSG";

const COUNTDOWN = "countdown/COUNTDOWN";

const PENDING = "pending/PENDING";

const SENDCODE = "sendcode/SENDCODE";

const MODALOPEN = "modalopen/MODALOPEN"

const QUE = "que/QUE"

const initialState = {
  already: { user: false, opp: false },
  gameStatus: false,
  level: 0,
  alertRun: false,
  alertMsg: "",
  runCountdown: false,
  pendingRun: { user: false, opp: false },
  sendRun: false,
  modalOpen : { chat : true, que: false, rule: true},
  queList : { question: "", questionTitle:"", questionId:""}
};

// Action Creators

export function alreadyUser(user) {
  return { type: ALREADY, user };
}

export function gameSwitch(bool) {
  return { type: SWITCH, bool };
}

export function setLevel(level) {
  return { type: LEVEL, level };
}

export function setAlert(bool) {
  return { type: ALERT, bool };
}

export function setMsg(str) {
  return { type: MSG, str };
}

export function setCountdown(bool) {
  return { type: COUNTDOWN, bool };
}

export function setPending(user) {
  return { type: PENDING, user };
}

export function sendCodeTiming(bool) {
  return { type: SENDCODE, bool };
}

export function ModalOpen(user) {
  return { type: MODALOPEN, user };
}

export function NewQue(user) {
  return { type: QUE, user };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ALREADY: {
      const Already_list = {
        ...state.already,
        ...action.user,
      };
      return { ...state, already: Already_list };
    }
    case SWITCH: {
      return { ...state, gameStatus: action.bool };
    }
    case LEVEL: {
      return { ...state, level: action.level };
    }
    case ALERT: {
      return { ...state, alertRun: action.bool };
    }
    case MSG: {
      return { ...state, alertMsg: action.str };
    }
    case COUNTDOWN: {
      return { ...state, runCountdown: action.bool };
    }
    case PENDING: {
      const Pending_list = {
        ...state.pendingRun,
        ...action.user,
      };
      return { ...state, pendingRun: Pending_list };
    }
    case SENDCODE: {
      return { ...state, sendRun: action.bool };
    }
    case MODALOPEN: {
      const Modal_list = {
        ...state.modalOpen,
        ...action.user,
      };
      return { ...state, modalOpen: Modal_list };
    }
    case QUE: {
      const que_list = {
        ...state.queList,
        ...action.user,
      };
      return { ...state, queList: que_list };
    }
    default:
      return state;
  }
}
