// types
import { NamespaceGrantType } from "../../utils/constructors-requests/namespace-request-handler";

export const getGrantTypeUserReadableDescription = (
  grantType: NamespaceGrantType
) => {
  switch (grantType) {
    case NamespaceGrantType.PUBLIC_READ_WRITE:
      return "Доступно для чтения и редактирования";
    case NamespaceGrantType.PRIVATE_READ_WRITE:
      return "Закрыто для чтения и редактирования";
    case NamespaceGrantType.PUBLIC_READ_PRIVATE_WRITE:
      return "Доступно для чтения, закрыто для редактирования";
  }
};
