import { createContext } from 'react';

export const PresenceContext = createContext({
  present: true,
  onExitComplete: () => {},
});

export default PresenceContext;