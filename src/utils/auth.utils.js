/**
 * * sign in/up with given email & string
 * @param {string} email
 * @param {string} password
 * @param {"signin" | "signup"} type
 */
export const sign = async (email, password, type) => {
  const payload = {
    email,
    password,
  };

  try {
    const response = await fetch(
      `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw response;
    }
    return [response, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
