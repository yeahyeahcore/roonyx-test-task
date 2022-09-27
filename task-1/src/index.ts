import { requestAllEpisodes } from "./api/episode";
import { requestEpisodeCharacters } from "./api/character";

const fetchFullInformationEpisodes = async () => {
  const { results: episodes } = await requestAllEpisodes();

  const parseEpisodeCharacterRequests = episodes.map(async (episode) => {
    const characters = await requestEpisodeCharacters(episode);

    return { ...episode, characters };
  });

  return Promise.all(parseEpisodeCharacterRequests);
};

fetchFullInformationEpisodes().then((fullInformationEpisode) =>
  console.log(JSON.stringify(fullInformationEpisode, null, 2))
);
