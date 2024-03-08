import './lol.scss'

export const metadata = {
  title: 'lol.calliander.net',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
