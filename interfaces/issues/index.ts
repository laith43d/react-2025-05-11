export interface PullRequest {
  id: number;
  number: number;
  state: "open" | "closed";
  title: string;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  draft: boolean;
  locked: boolean;
  assignee: any | null;
  assignees: any[];
  author_association: string;
  comments: number;
  html_url: string;
  comments_url: string;
  events_url: string;
  labels_url: string;
  repository_url: string;
  timeline_url: string;
  node_id: string;
  labels: {
    id?: number;
    name?: string;
    color?: string;
    description?: string;
  }[];
  milestone: any | null;
  active_lock_reason: string | null;
  user: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    type: string;
    site_admin: boolean;
  };
  pull_request: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: string | null;
  };
  reactions: {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  state_reason: string | null;
  closed_by: any | null;
  performed_via_github_app: any | null;
}

export type IssueStatus = "open" | "closed" | "all";
export type Sort = "created" | "updated" | "comments";
export type Direction = "asc" | "desc";

import { AxiosError } from "axios";

interface GitHubAPIErrorResponse {
  message: string;
  documentation_url: string;
}

export type GitHubAxiosError = AxiosError<GitHubAPIErrorResponse>;
