import { Direction, Sort } from "@/interfaces/issues/index";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/services";
import { PullRequest, IssueStatus } from "@/interfaces/issues";

function useGetIssues() {
  const [issueState, setIssueState] = useState<string>("all");
  const [creator, setCreator] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState<string>("created");

  const [direction, setDirection] = useState<string>("desc");

  const [debounceCreator, setDebounceCreator] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceCreator(creator), 300);
    return () => {
      clearTimeout(timeOut);
    };
  }, [creator]);

  const { data, isLoading } = useQuery({
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
  };
}

export default useGetIssues;
