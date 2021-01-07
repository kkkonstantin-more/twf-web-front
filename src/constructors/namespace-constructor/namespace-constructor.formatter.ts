// types
import {
  NamespaceConstructorInputs,
  NamespaceReceivedForm,
  NamespaceSendForm,
  NamespaceUserGrants,
} from "../../constructors/namespace-constructor/namespace-constructor.types";
// utils
import { convertInputStringListSeparatedByCommasToArray } from "../../redux/constructor-jsons/constructor-jsons.utils";

class NamespaceConstructorFormatter {
  public static convertReceivedFormToSendForm(
    data: NamespaceReceivedForm
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

  public static convertReceivedFormToConstructorInputs(
    data: NamespaceReceivedForm
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

export default NamespaceConstructorFormatter;
