export function getURLSearchPath(page) {
  const url = new URL(window.location);
  url.searchParams.set("page", page);
  return url.search;
}
