import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME
} from '$env/static/private';

const assetsFolder = 'calliander';

// Cloudinary CNAME. Private-CDN URLs omit the cloud name; if this account
// delivers over the shared CDN, the path needs `/${CLOUDINARY_CLOUD_NAME}` here.
const deliveryHost = 'https://assets.calliander.net';

const auth = `Basic ${Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString('base64')}`;

const fileOnly = (publicId) => publicId.slice(publicId.lastIndexOf('/') + 1);

const deliveryUrl = ({ format, public_id, resource_type }) =>
  `${deliveryHost}/${resource_type}/upload/${public_id}.${format}`;

const listResources = async (resourceType, prefix) => {
  const resources = [];
  let cursor;

  do {
    const url = new URL(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/${resourceType}`
    );
    url.searchParams.set('type', 'upload');
    url.searchParams.set('prefix', prefix);
    url.searchParams.set('max_results', '500');

    if (cursor) {
      url.searchParams.set('next_cursor', cursor);
    }

    const response = await fetch(url, { headers: { Authorization: auth } });

    if (!response.ok) {
      throw new Error(
        `Cloudinary listing failed for ${prefix} (${response.status}): ${await response.text()}`
      );
    }

    const body = await response.json();

    resources.push(...body.resources);
    cursor = body.next_cursor;
  } while (cursor);

  return resources;
};

const memeInfo = (resource, thumbs) => {
  const file = fileOnly(resource.public_id);
  const isVideo = resource.resource_type === 'video';
  const isGif = resource.format === 'gif';
  const rawFileSize = resource.bytes / 1024;
  const isKb = rawFileSize < 1024;

  return {
    fileSize: (isKb ? rawFileSize : rawFileSize / 1024).toFixed(2),
    href: deliveryUrl(resource),
    isVideo,
    name: file.replace(/[_-]+/g, ' '),
    sizeLabel: isKb ? 'Kb' : 'Mb',
    src: deliveryUrl(isVideo ? thumbs.get(file) : resource),
    type: isVideo ? 'Video' : isGif ? 'GIF' : 'Image'
  };
};

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const [images, videos, thumbs] = await Promise.all([
    listResources('image', `${assetsFolder}/images/`),
    listResources('video', `${assetsFolder}/videos/`),
    listResources('image', `${assetsFolder}/thumbs/`)
  ]);

  const thumbsByName = new Map(thumbs.map((thumb) => [fileOnly(thumb.public_id), thumb]));
  const missingThumbs = videos
    .map((video) => fileOnly(video.public_id))
    .filter((file) => !thumbsByName.has(file));

  if (missingThumbs.length) {
    throw new Error(`No ${assetsFolder}/thumbs entry for: ${missingThumbs.join(', ')}`);
  }

  const memes = images
    .concat(videos)
    .sort((a, b) => fileOnly(a.public_id).localeCompare(fileOnly(b.public_id)));

  return {
    memes: memes.map((meme) => memeInfo(meme, thumbsByName))
  };
}
