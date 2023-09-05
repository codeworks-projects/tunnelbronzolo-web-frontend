import { ApolloError } from "@apollo/client";
import { ComposerTranslation } from "@nuxtjs/i18n/dist/runtime/composables";
import { OptionsParameter } from "@vue/apollo-composable/dist/useQuery";

export const handleApolloRequestError = (
  error: ApolloError,
  t: ComposerTranslation
) => {
  const errorCode = error.graphQLErrors[0]?.extensions?.code;
  switch (errorCode) {
    case "401":
      notifyError(t("request.credentialsAreWrong"));
      break;

    default:
      notifyError(t("request.errorOccurredWhileProcessingRequest"));
  }
};

export const getTranslatedValue = (
  value?: Record<string, unknown>
): String | undefined => {
  const { locale } = useI18n();
  const currentLocale = locale.value;

  if (value?.[currentLocale]) {
    return value?.[currentLocale] as String;
  }

  return value?.en as String;
};

export const getApolloRequestOptions = (): OptionsParameter<any, null> => {
  return reactive({
    fetchPolicy: "no-cache",
  });
};

export const availableTranslations = gql`
  fragment AvailableTranslations on Translation {
    it
  }
`;
