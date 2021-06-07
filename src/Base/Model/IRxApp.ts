import { ID } from "../../rx-drag/models/baseTypes";
import { IRxAuth } from "./IRxAuth";
//import IMenuItem from "./IMenuItem";
import { IRxPage } from "./IRxPage";

export interface IRxApp{
  id?:ID;
  name?: string;
  isSystem?: boolean;
  icon?: string; 
  color?: string;
  appType?: string;
  pages?: Array<IRxPage>;
  navigationItems?: string;
  auths?: Array<IRxAuth>;
  notifications?: number;
  entryPageId?:ID;
}