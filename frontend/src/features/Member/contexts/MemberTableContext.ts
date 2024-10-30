import { createContext } from "react";

export interface MemberTableOptions {
  date: string;
}

export const MemberTableContext = createContext<MemberTableOptions>({
  date: ''
});