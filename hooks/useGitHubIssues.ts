import { useQuery } from "@tanstack/react-query";

export type GitHubIssue = {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
};

type GitHubIssuesParams = {
  owner: string;
  repo: string;
  page?: number;
  per_page?: number;
  // sort?: "created" | "updated" | "comments";
  sort?: string;
  // direction?: "asc" | "desc";
  direction?: string;
  state?: "open" | "closed" | "all";
};

const fetchGitHubIssues = async (
  params: GitHubIssuesParams
): Promise<{ issues: GitHubIssue[]; total: number }> => {
  const {
    owner,
    repo,
    page = 1,
    per_page = 20,
    sort = "created",
    direction = "desc",
    state = "all",
  } = params;

  // get the total count of issues using the search API
  const searchQuery = `repo:${owner}/${repo} is:issue${
    state !== "all" ? ` is:${state}` : ""
  }`;
  const searchUrl = new URL("https://api.github.com/search/issues");
  searchUrl.searchParams.append("q", searchQuery);
  searchUrl.searchParams.append("per_page", "1");

  const searchResponse = await fetch(searchUrl.toString(), {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!searchResponse.ok) {
    throw new Error(`GitHub Search API error: ${searchResponse.status}`);
  }

  const searchData = await searchResponse.json();
  const total = searchData.total_count;

  // Then get the actual issues for the current page
  const url = new URL(`https://api.github.com/repos/${owner}/${repo}/issues`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", per_page.toString());
  url.searchParams.append("sort", sort);
  url.searchParams.append("direction", direction);

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const issues = await response.json();

  console.log("GitHub API Response:", {
    issuesCount: issues.length,
    page,
    per_page,
    exactTotal: total,
  });

  return { issues, total };
};

export const useGetGitHubIssues = (params: GitHubIssuesParams) => {
  return useQuery({
    queryKey: ["github-issues", params],
    queryFn: () => fetchGitHubIssues(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!(params.owner && params.repo),
  });
};
