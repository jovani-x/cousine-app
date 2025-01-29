import { getUserSession } from "../auth";
import { UserType } from "../types/user";

// return user's info
// fake implementation - just retrieve info from the session
const getUserInfo = async (): Promise<UserType> => {
  const session = await getUserSession();
  const { name, email, image } = session?.user || {};

  return {
    name: name ?? "anonymous",
    email: email ?? "none",
    image,
  };
};

export { getUserInfo };
