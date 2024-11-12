import { useState } from "react";

const useLoadMore = (initialData, fetchData, inDocument = true) => {
  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = async (newList = false) => {
    try {
      setIsLoading(true);
      let newData = await fetchData(newList);

      if (inDocument) {
        newData = newData.map(({ document }) => document);
      }

      if (newData.length === 0) {
        setHasMore(false);
      }

      if (newList) {
        setData(newData);
      } else {
        setData((prevData) => [...prevData, ...newData]);
      }
    } catch (error) {
      console.error("Error loading more data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteVideo = (id) => {
    setData((prevData) => prevData.filter((video) => video.id !== id));
  };

  return { data, handleLoadMore, hasMore, isLoading, deleteVideo };
};

export default useLoadMore;
