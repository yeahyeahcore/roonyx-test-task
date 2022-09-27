import axios from "axios";

import { sleep } from "../utils/sleep";

import type { Character } from "../types/models/character";
import type { Episode } from "../types/models/episode";

export const requestEpisodeCharacters = async (episode: Episode): Promise<Character[]> => {
  const characters: Character[] = [];

  for (const characterURL of episode.characters) {
    const { data } = await axios.get<Character>(characterURL);

    await sleep(2000);

    characters.push(data);
  }

  return characters;
};
