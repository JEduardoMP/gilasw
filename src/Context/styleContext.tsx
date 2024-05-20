import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { DispatchStyleContext } from '../Constants/styleContext';

const StyleContext = createContext<{
  state: { dark: boolean };
  dispatch: (action: { type: string }) => void;
}>({
  state: { dark: false },
  dispatch: () => {},
});

const styleReducer = (state: { dark: boolean }, action: { type: string }) => {
  switch (action.type) {
    case DispatchStyleContext.TOGGLE:
      return { dark: !state.dark };
    default:
      return state;
  }
};

export const StyleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(styleReducer, { dark: false });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};
