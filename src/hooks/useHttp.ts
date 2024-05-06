const BASE_URL = "https://api.tvmaze.com/";

export const useHttp = () => {
  const get = async <T>(url: string) => {
    try {
      const req = await fetch(`${BASE_URL}${url}`);
      const res = await req.json();
      return res as T;
    } catch (err) {
      throw err;
    }
  };
  return { get };
};
