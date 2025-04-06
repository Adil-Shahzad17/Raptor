import config from "../Appwrite/config";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const PEXELS_API_KEY = config.pexels_api_key;

class PEXELS {
  async fetchPexelsImages({ query, page = 1 }) {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      if (page === 1) {
        return await pexels.search({ query });
      }

      const response = await fetch(
        `https://api.pexels.com/v1/search?page=${page}&per_page=3&query=${query}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      return await response.json();
    } catch (error) {
      throw new Error(
        `We are unable to find any results for ${query}, try something different.`
      );
    }
  }

  usePexelsImages(query, page) {
    return useQuery({
      queryKey: ["pexels_images", query, page],
      queryFn: () => this.fetchPexelsImages({ query, page }),
      staleTime: 1000 * 60 * 1,
      placeholderData: keepPreviousData,
      enabled: !!query,
    });
  }

  async search({ query, page = 1 }) {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=3&page=${page}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error("Search Error", error.message);
    }
  }
}

const pexels = new PEXELS();

export default pexels;
