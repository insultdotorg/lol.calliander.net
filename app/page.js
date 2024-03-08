import fs from 'fs'

const publicPath = `${process.cwd()}/public`

const Meme = ({ filename }) => {
  const meme = filename.split('.')
  const file = meme.shift()
  const name = file.replace(/[_-]+/g, ' ')
  const extension = meme.pop()
  const isVideo = extension === 'mp4'
  const isGif = extension === 'gif'
  const type = isVideo ? 'Video' : (isGif ? 'GIF' : 'Image')
  const statsPath = `${publicPath}/${isVideo ? 'videos' : 'images'}`
  const { size } = fs.statSync(`${statsPath}/${filename}`)
  const rawFileSize = size / 1024
  const isKb = rawFileSize < 1024
  const fileSize = (isKb ? rawFileSize : rawFileSize / 1024).toFixed(2)
  const sizeLabel = isKb ? 'Kb' : 'Mb'

  return (
    <li>
      <a href={`/${isVideo ? 'videos' : 'images'}/${filename}`} target={isVideo ? undefined : '_blank'}>
        <img
          src={`/${isVideo ? 'thumbs' : 'images'}/${file}.${isVideo ? 'jpg' : extension}`}
          alt={name}
          width="345"
        />

        <div data-meta>
          <strong>{name}</strong>
          <span>{type} / {fileSize} {sizeLabel}</span>
        </div>
      </a>
    </li>
  )
}

export default async function Home() {
  const images = fs.readdirSync(`${publicPath}/images`)
  const videos = fs.readdirSync(`${publicPath}/videos`)
  const memes = images.concat(videos).sort()

  return (
    <>
      <header>lol.calliander.net</header>
      
      <main>
        <ul>
          {memes.map((meme, i) => <Meme key={`meme-${i}`} filename={meme} />)}
        </ul>
      </main>
    </>
  )
}
