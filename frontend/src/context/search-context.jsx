"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import api from "@/lib/api";

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPhotos() {
      try {
        const response = await api.get("/photos");
        setAllPhotos(response.data);
        setPhotos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar fotos", error);
        setLoading(false);
      }
    }

    fetchAllPhotos();
  }, []);

  const handleSearch = async (term) => {
    if (!term) {
      setPhotos(allPhotos);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/search?term=${term}`);
      setPhotos(response.data);
    } catch (error) {
      console.error("Erro ao buscar fotos", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = debounce((term) => handleSearch(term), 1000);

  useEffect(() => {
    if (searchTerm === "") {
      handleSearch("");
    } else {
      debouncedSearch(searchTerm);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  const handleDeletePhoto = async (id) => {
    try {
      await api.delete(`/photos/${id}`);
      setAllPhotos(allPhotos.filter((photo) => photo.id !== id));
      setPhotos(photos.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error("Erro ao deletar foto:", error);
    }
  };

  const value = {
    searchTerm,
    setSearchTerm,
    photos,
    loading,
    handleDeletePhoto,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
