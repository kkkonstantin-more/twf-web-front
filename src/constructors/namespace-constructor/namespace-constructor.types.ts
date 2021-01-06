import { NamespaceGrantType } from "../../utils/constructors-requests/namespace-request-handler";

export interface NamespaceConstructorInputs {
  code: string;
  allowRead: boolean | "true" | "false";
  grantType: NamespaceGrantType;
  readGrantedUsers: string[] | string;
  writeGrantedUsers: string[] | string;
}
