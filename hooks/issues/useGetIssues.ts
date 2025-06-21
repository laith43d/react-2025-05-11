import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/services";
import { AxiosError } from "axios";
import { GitHubAxiosError } from "@/interfaces/issues";

function useGetIssues() {
  const [issueState, setIssueState] = useState<string>("all");
  const [creator, setCreator] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState<string>("created");
  const [errorObject, setErrorObject] = useState<GitHubAxiosError | null>(null);
  const [direction, setDirection] = useState<string>("desc");

  const [debounceCreator, setDebounceCreator] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceCreator(creator), 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [creator]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "getIssues",
      issueState,
      page,
      size,
      debounceCreator,
      sort,
      direction,
    ],
    queryFn: getIssues,
  });

  useEffect(() => {
    if (error) {
      setErrorObject(error as GitHubAxiosError);
    } else {
      setErrorObject(null);
    }
  }, [error]);

  const changeSize = (size: string) => {
    setSize(Number(size));
  };
  const prevPage = () => {
    if (page === 0) return;
    setPage((prev) => prev - 1);
  };
  const nextPage = () => {
    if (data && data?.length <= size) setPage((prev) => prev + 1);
  };
  const onCreatorValueChange = (value: string) => {
    setCreator(value);
  };

  console.log("error", error as AxiosError);

  return {
    issues: data,
    isLoading,
    issueState,
    setIssueState,
    creator,
    page,
    changeSize,
    prevPage,
    nextPage,
    onCreatorValueChange,
    sort,
    setSort,
    direction,
    setDirection,
    size,
    errorObject,
  };
}

export default useGetIssues;
