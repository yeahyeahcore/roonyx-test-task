import axios from "axios";

import { SERVER_API } from "../constants/api";

import type { ServerPaginationResponse } from "../types/api/server-response";
import type { Episode } from "../types/models/episode";

export const requestAllEpisodes = async (): Promise<ServerPaginationResponse<Episode>> => {
  const { data } = await axios.get<ServerPaginationResponse<Episode>>(SERVER_API.episode);

  return data;
};
