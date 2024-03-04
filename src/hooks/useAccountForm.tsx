import { useContext } from "react";

import {
  AccountFormContext,
  AccountFormContextDataProps,
} from "../contexts/AccountFormContext";

export function useAccountForm(): AccountFormContextDataProps {
  const context = useContext(AccountFormContext);

  return context;
}
