import { SearchState } from "@/pages/SearchPage";
import { Restraunt, RestrauntSearchResponse } from "../../types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestraunt = (restrauntId?: string) => {
  const getRestrauntByIdRequest = async (): Promise<Restraunt> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restraunt/${restrauntId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restraunt");
    }

    return response.json();
  };

  const { data: restraunt, isLoading } = useQuery(
    "fetchRestraunt",
    getRestrauntByIdRequest,
    {
      enabled: !!restrauntId,
    }
  );

  return { restraunt, isLoading };
};

export const useSearchRestraunts = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestrauntSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restraunt/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restraunt");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestraunts", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};