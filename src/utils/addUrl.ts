import config from '../config';

export const addUrl = (cover: string, folder: string) => {
  if (!cover) {
    return null;
  }

  const linkCover = `${config.apiUrl}/${folder}/${cover}`;
  return linkCover;
};
