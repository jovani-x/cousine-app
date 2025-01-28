import { useEffect } from "react";
import { useAuth } from "../../auth";
import { getRecipeIds, removeRecipeIds } from "../../utils/recipeIdsStore";

// AuthSessionWatcher component monitors changes in the authentication session and triggers the appropriate function (startSession/stopSession)
export const AuthSessionWatcher = () => {
  const { session } = useAuth();

  useEffect(() => {
    const startSession = async () => {
      // get user recipes IDs from db and save them to localStorage for quick access
      await getRecipeIds();
    };

    const stopSession = async () => {
      // remove user recipes IDs from localStorage
      await removeRecipeIds();
    };

    if (!session) {
      stopSession();
    } else {
      startSession();
    }
  }, [session]);

  return null;
};
