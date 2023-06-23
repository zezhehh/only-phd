import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const curPlaceAtom = atom("");

const tokenKey = "onlyPhDToken";
export const tokenAtom = atomWithStorage(tokenKey, "");

export const isAdminAtom = atom(false);
