export function matchRoute(pathname = '/') {
  const path = String(pathname).replace(/\/+$/, '') || '/'
  if (path === '/bio') return { name: 'bio' }
  const writing = path.match(/^\/writing\/([a-z0-9-]+)$/)
  if (writing) return { name: 'essay', slug: writing[1] }
  if (path === '/writing') return { name: 'home', hash: 'writing' }
  return { name: 'home' }
}
