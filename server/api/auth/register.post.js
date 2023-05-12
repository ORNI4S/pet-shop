export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  try {
    const data = await $fetch(`${apiBase}/user/register/`, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
      },
    });
    if (data) {
      try {
        const tokens = await $fetch(`${apiBase}/user/token/`, {
          method: "POST",
          body,
          headers: {
            Accept: "application/json",
          },
        });
        setCookie(event, "accessToken", tokens.access, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 70, //1 week
          path: "/",
        });
        setCookie(event, "refreshToken", tokens.refresh, {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 70, //1 week
          path: "/",
        });
      } catch (error) {
        console.log(error);
        console.log(error);
      }
    }
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
});
// {username: 'dasdsa', email: 'addasdas@gmail.com'}