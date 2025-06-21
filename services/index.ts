import axios from "axios";
import { PullRequest } from "@/interfaces/issues";

interface GetIssuesArgs {
  queryKey: any[];
  signal?: AbortSignal; // <- Accept the signal from react-query
}

export async function getIssues({
  queryKey,
  signal,
}: GetIssuesArgs): Promise<PullRequest[]> {
  const [, state, page, size, creator, sort, direction] = queryKey;

  const url = `https://api.github.com/repos/laith43d/cryptocurrencynews/issues?state=${state}&page=${page}&per_page=${size}&sort=${sort}&direction=${direction}${
    creator.length > 0 ? `&creator=${creator}` : ""
  }`;

  const response = await axios.get<PullRequest[]>(url, {
    signal,
  });

  return response.data;
}
