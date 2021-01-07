export enum NamespaceGrantType {
  PUBLIC_READ_WRITE = "PUBLIC_READ_WRITE",
  PUBLIC_READ_PRIVATE_WRITE = "PUBLIC_READ_PRIVATE_WRITE",
  PRIVATE_READ_WRITE = "PRIVATE_READ_WRITE",
}

export enum NamespaceUserGrants {
  READ_WRITE = "READ_WRITE",
  READ_NO_WRITE = "READ_NO_WRITE",
}

export interface NamespaceConstructorInputs {
  code: string;
  allowRead: boolean | "true" | "false";
  grantType: NamespaceGrantType;
  readGrantedUsers: string[] | string;
  writeGrantedUsers: string[] | string;
}

export interface NamespaceSendFormUserGrants {
  [userCode: string]: NamespaceUserGrants;
}

export interface NamespaceReceivedForm {
  code: string;
  grantType: NamespaceGrantType;
  authorUserCode: string;
  writeGrantedUsers: string[];
  readGrantedUsers: string[];
}

export interface NamespaceSendForm {
  code: string;
  grantType: NamespaceGrantType;
  userGrants: { [key: string]: string }[];
}
