import { readdirSync, statSync } from 'fs';

const assetsBase = '../assets/calliander';
const imagesDir = `${assetsBase}/images`;
const videosDir = `${assetsBase}/videos`;

const fileOnly = (filename) => filename.replace(/\.[^/.]+$/, '');
const fileLabel = (filename) =>
  fileOnly(filename)
    .replaceAll('_-_', ' ')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ');
const memeInfo = (filename) => {
  const meme = filename.split('.');
  const file = meme.shift();
  const extension = meme.pop();
  const isGif = extension === 'gif';
  const isVideo = extension === 'mp4';
  const { size } = statSync(`${isVideo ? videosDir : imagesDir}/${filename}`);
  const rawFileSize = size / 1024;
  const isKb = rawFileSize < 1024;

  return {
    extension,
    fileSize: (isKb ? rawFileSize : rawFileSize / 1024).toFixed(2),
    hrefDirectory: isVideo ? 'videos' : 'images',
    hrefFilename: filename,
    isVideo,
    name: file.replace(/[_-]+/g, ' '),
    sizeLabel: isKb ? 'Kb' : 'Mb',
    srcDirectory: isVideo ? 'thumbs' : 'images',
    srcFilename: isVideo ? `${file}.jpg` : filename,
    type: isVideo ? 'Video' : isGif ? 'GIF' : 'Image'
  };
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const images = readdirSync(imagesDir);
  const videos = readdirSync(videosDir);
  const memes = images.concat(videos).sort();

  return {
    memes: memes.map((meme) => memeInfo(meme))
  };
}
