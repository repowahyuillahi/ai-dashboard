// AvatarMemoji — avatar SVG wajah memoji sederhana dalam lingkaran krem:
// kulit sawo matang, rambut hitam, kacamata oranye, senyum ramah.
// Dipakai untuk profil pengguna & sidebar (tanpa gambar eksternal).
// Palet ilustrasi tinggal sebagai variabel --avatar-* di index.css.

export default function AvatarMemoji({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Avatar pengguna"
    >
      <circle cx="24" cy="24" r="24" style={{ fill: 'var(--avatar-cream)' }} />
      {/* leher & bahu */}
      <path d="M14 44c1.5-5 5.4-7 10-7s8.5 2 10 7c-3 1.6-6.4 2.4-10 2.4S17 45.6 14 44Z" style={{ fill: 'var(--color-sage-900)' }} />
      <path d="M20.5 34h7l-.8 4.4a3 3 0 0 1-5.4 0L20.5 34Z" style={{ fill: 'var(--avatar-skin-dark)' }} />
      {/* wajah */}
      <ellipse cx="24" cy="24.5" rx="9.6" ry="10.6" style={{ fill: 'var(--avatar-skin)' }} />
      {/* kuping */}
      <circle cx="14.2" cy="25.5" r="2" style={{ fill: 'var(--avatar-skin-dark)' }} />
      <circle cx="33.8" cy="25.5" r="2" style={{ fill: 'var(--avatar-skin-dark)' }} />
      {/* rambut hitam */}
      <path
        d="M14.4 23.4c-.6-6.8 3.4-11.2 9.6-11.2s10.2 4.4 9.6 11.2c-.9-3.9-2.4-5.9-4.9-7-1.9 1.2-4.4 1.6-7 .9-2.3-.6-4.3.2-5.4 1.7-.8 1.1-1.4 2.6-1.9 4.4Z"
        style={{ fill: 'var(--avatar-hair)' }}
      />
      {/* kacamata oranye */}
      <g style={{ stroke: 'var(--avatar-glasses)' }} strokeWidth="1.7" fill="none" strokeLinecap="round">
        <rect x="15.9" y="22.6" width="7" height="5.6" rx="2.4" />
        <rect x="25.1" y="22.6" width="7" height="5.6" rx="2.4" />
        <path d="M22.9 24.8h2.2M15.9 24.4l-1.5-.7M32.1 24.4l1.5-.7" />
      </g>
      {/* mata */}
      <circle cx="19.4" cy="25.4" r="1.05" style={{ fill: 'var(--avatar-eye)' }} />
      <circle cx="28.6" cy="25.4" r="1.05" style={{ fill: 'var(--avatar-eye)' }} />
      {/* hidung + senyum */}
      <path d="M24 26.8c.5 1 .5 1.7-.2 2.3" style={{ stroke: 'var(--avatar-nose)' }} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M20.4 30.6c1.1 1.5 2.3 2.2 3.6 2.2s2.5-.7 3.6-2.2" style={{ stroke: 'var(--avatar-smile)' }} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* pipi */}
      <ellipse cx="17.6" cy="29.6" rx="1.7" ry="1" style={{ fill: 'var(--avatar-cheek)' }} opacity="0.55" />
      <ellipse cx="30.4" cy="29.6" rx="1.7" ry="1" style={{ fill: 'var(--avatar-cheek)' }} opacity="0.55" />
    </svg>
  )
}
