import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CollectionGrid from "../../components/CollectionGrid";
import ErrorMessage from "../../components/ErrorMessage";
import { SearchForm } from "../../components/SearchForm";
import { Diets } from "../../constants/diets";
import { useSearchRecipes } from "../../hooks/useSearchRecipes";
import { RecipeType, SearchOpts } from "../../types/recipe";
import { getErrorMessage } from "../../utils/helpers";

const FindPage = () => {
  const [isMyCollection, setIsMyCollection] = useState(true);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const [minCalories, setMinCalories] = useState<number | undefined>(undefined);
  const [maxCalories, setMaxCalories] = useState<number | undefined>(undefined);
  const [diets, setDiets] = useState<Record<Diets, boolean> | undefined>(
    undefined
  );
  const [isEmpty, setIsEmpty] = useState(true);

  const searchAction = ({
    isMyCollection,
    query,
    minCalories,
    maxCalories,
    diets,
  }: SearchOpts) => {
    setIsMyCollection(isMyCollection);
    setQuery(query);
    setMinCalories(minCalories);
    setMaxCalories(maxCalories);
    setDiets(diets);
    setIsEmpty(false);
  };

  const searchOpts = {
    isMyCollection,
    diets,
    minCalories,
    maxCalories,
    query,
    resultNumber: 2,
    addRecipeInformation: true,
  };

  const { recipes, isPending, isError, error, refetch } = useSearchRecipes({
    searchOpts,
  });

  useEffect(() => {
    if (!isEmpty) {
      refetch();
    }
  }, [
    query,
    minCalories,
    maxCalories,
    diets,
    isMyCollection,
    refetch,
    isEmpty,
  ]);

  if (isError) return <ErrorMessage error={getErrorMessage(error)} />;

  return (
    <>
      <Typography variant="h3" component="h1">
        Search recipe(s)
      </Typography>
      <SearchForm action={searchAction} />
      <CollectionGrid
        loading={isEmpty ? false : isPending}
        collection={isEmpty ? undefined : (recipes as RecipeType[] | undefined)}
      />
    </>
  );
};

export default FindPage;
