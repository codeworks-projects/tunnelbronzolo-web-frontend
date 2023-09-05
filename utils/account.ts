const USER_COOKIE_NAME = "user";

export const setUserSessionData = (id: string, identity: Identity) => {
  const now = new Date();
  const expires = new Date(
    now.getFullYear() + 10,
    now.getMonth(),
    now.getDate()
  );

  const config = useRuntimeConfig();
  const isDev = Boolean(config.public.IS_DEV);
  const secure = !isDev;

  const userCookie = useCookie(USER_COOKIE_NAME, {
    default: () => ({} as AccountData),
    expires,
    secure,
  });
  userCookie.value = {
    id,
    identity,
  } as AccountData;
};

export const isUserAuthenticated = (): boolean => {
  const userCookie = useCookie(USER_COOKIE_NAME);
  const authToken = useCookie("auth-token");

  return (
    typeof userCookie.value !== "undefined" &&
    typeof authToken.value !== "undefined"
  );
};

export const getUserIdentity = (): Identity => {
  const userCookie = useCookie(USER_COOKIE_NAME);

  return ((userCookie.value as unknown as AccountData).identity || {
    name: "...",
  }) as Identity;
};

export const logOutCurrentUser = () => {
  const userCookie = useCookie(USER_COOKIE_NAME);
  userCookie.value = null;
};
