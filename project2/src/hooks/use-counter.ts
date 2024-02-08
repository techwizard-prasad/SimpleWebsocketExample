import { useEffect, useMemo, useReducer } from "react";
import useWebSocket from "react-use-websocket";

type ICounter = Record<string, number>;

interface ICounterState {
  counters: ICounter;
}

enum ActionType {
  SET_VALUE = "set_value",
  INCREMENT = "increment",
}

interface IReducer {
  type: ActionType;
  payload: string | ICounter;
}

const initialState = {
  counters: {},
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reducer = (_: ICounterState = initialState, action: IReducer) => {
  switch (action.type) {
    case ActionType.SET_VALUE: {
      return { counters: { ...(action.payload as ICounter) } };
    }
  }
};

const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const allCounters = useMemo(
    () =>
      Object.entries(state?.counters ?? {}).map(([key, value]) => ({
        id: key,
        count: value,
      })),
    [state?.counters]
  );

  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    "ws://localhost:8000/"
  );

  const incrementCount = (id: string) => {
    const updatedCounter = { ...(state?.counters ?? {}) };
    updatedCounter[id]++;

    checkWebSocketAndUpdate(updatedCounter);
  };

  const checkWebSocketAndUpdate = (newState: ICounter) => {
    if (readyState) {
      sendJsonMessage(newState);
    } else {
      console.log("Server not ready t accept", newState);
    }
  };

  const setCounterValue = (payload: ICounter) => {
    dispatch({
      type: ActionType.SET_VALUE,
      payload,
    });
  };

  useEffect(() => {
    if (lastJsonMessage) {
      setCounterValue(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return { allCounters, incrementCount };
};

export default useCounter;
