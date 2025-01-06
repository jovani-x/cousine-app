import { AuthData, Session } from "./types";

// fake user data
const testUser = {
  id: "test_12345",
  name: "Test Username",
  email: "test.username@test.test",
  image: undefined,
};

export const signin = async ({
  authData,
}: {
  authData: AuthData;
}): Promise<Session | null> => {
  if (!authData) return null;

  // try {
  //   const user = await loginFn(authData);
  //   return { user };
  // } catch (error) {
  //   console.log(error.message);
  //   return null;
  // }

  // fake response
  return new Promise((resolve) => {
    setTimeout(() => resolve({ user: testUser }), 2000);
  });
};

export const signout = async () => {
  // try {
  //   await logoutFn();
  // } catch (error) {
  //   console.log(error.message);
  // }

  // fake response
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 2000);
  });
};
