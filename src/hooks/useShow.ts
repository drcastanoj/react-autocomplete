import { Search, Show } from "../model";
import { useHttp } from "./useHttp";

export const useShow = () => {
  const { get } = useHttp();
  const getSearch = async (query: string) => {
    const res = await get<Search[]>(`search/shows?q=${query}`);
    return res;
  };

  const getShow = async (id: number) => {
    const res = await get<Show>(`shows/${id}`);
    return res;
  };
  return { getSearch, getShow };
};
