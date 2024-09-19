import { createContext } from "react";

export type MemberTableOptions = {
  date: string;
}

export const MemberTableContext = createContext<MemberTableOptions>({
  date: ''
});