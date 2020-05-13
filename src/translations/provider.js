import React, { Fragment } from "react";
import { IntlProvider } from "react-intl";

import { LOCALES } from "./locale";
import messages from "./messages/index";

const Provider = ({ children, locale = LOCALES.RUSSIAN }) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

export default Provider;
