export const generateCrumbs = (pathname: string) => {
  const paths = pathname.split("/").filter((p) => p);
  const crumbs = [{ name: "Dashboard", href: "/" }];

  if (paths[0] === "dashboard" || paths.length === 0) {
    return crumbs;
  }

  paths.forEach((path, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const name = path
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    crumbs.push({ name, href });
  });

  return crumbs;
};
