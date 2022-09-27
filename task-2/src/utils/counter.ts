type Counter = [() => void, () => void];

export const counter = (initialCount = 0): Counter => {
  const state = {
    current: initialCount,
  };

  const getCurrentCounter = () => state.current;
  const increaseCounter = () => {
    state.current = state.current + 1;
  };

  return [getCurrentCounter, increaseCounter];
};
