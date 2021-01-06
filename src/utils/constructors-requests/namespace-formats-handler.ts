// types
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import {
  NamespaceReceiveForm,
  NamespaceSendForm,
  NamespaceUserGrants,
} from "./namespace-request-handler";
// utils
import { convertInputStringListSeparatedByCommasToArray } from "../../redux/constructor-jsons/constructor-jsons.utils";

class NamespaceFormatsHandler {
  public static convertReceiveFormToSendForm(
    data: NamespaceReceiveForm
  ): NamespaceSendForm {
    return {
      code: data.code,
      grantType: data.grantType,
      userGrants: data.readGrantedUsers
        .map((userCode: string) => ({
          [userCode]: NamespaceUserGrants.READ_NO_WRITE,
        }))
        .concat(
          data.writeGrantedUsers.map((userCode: string) => ({
            [userCode]: NamespaceUserGrants.READ_WRITE,
          }))
        ),
    };
  }

  public static convertReceiveFormToConstructorInputs(
    data: NamespaceReceiveForm
  ): NamespaceConstructorInputs {
    return {
      code: data.code,
      allowRead: data.readGrantedUsers.length === 0 ? "true" : "false",
      grantType: data.grantType,
      readGrantedUsers: data.readGrantedUsers.join(","),
      writeGrantedUsers: data.writeGrantedUsers.join(","),
    };
  }

  public static convertConstructorInputsToSendForm(
    data: NamespaceConstructorInputs
  ): NamespaceSendForm {
    return {
      code: data.code,
      grantType: data.grantType,
      userGrants: convertInputStringListSeparatedByCommasToArray(
        data.writeGrantedUsers
      )
        .map((userCode: string) => ({
          [userCode]: NamespaceUserGrants.READ_WRITE,
        }))
        .concat(
          convertInputStringListSeparatedByCommasToArray(data.readGrantedUsers)
            .filter(
              (userCode: string) => !data.writeGrantedUsers.includes(userCode)
            )
            .map((userCode: string) => ({
              [userCode]: NamespaceUserGrants.READ_NO_WRITE,
            }))
        ),
    };
  }
}

export default NamespaceFormatsHandler;
