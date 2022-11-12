import { atom } from "jotai";
import { basepath } from "./basepath";

export const isPocketAtom = atom(false);
export const fileUrlAtom = atom(`${basepath}/steve.png`);