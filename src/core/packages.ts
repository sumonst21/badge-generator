/**
 * Package badges module.
 */
import {
  GO_MODULE_SHIELD,
  NODE_VERSION_BADGE,
  STATIC_DEPENDENCY,
} from "@/constants/badgeValues";
import { REGISTRY, SHIELDS_API } from "@/constants/urls";
import { buildUrl } from "./badges";
import { genericBadge } from "./genericBadge";
import { mdImageWithLink } from "./markdown";
import { Repo } from "./Repo";
import {
  ENVIRONMENT,
  logoQueryParams,
  nodePkgJsonShieldUrl,
} from "./shieldsApi";
import { TLogoAppearance } from "./shieldsApi.d";

/**
 * Static dependency badge.
 *
 * A flat generic badge which can describe to any system or project package dependency.
 *
 * Supports use of name, version range, external link and optional logo. The name might be "Node" or
 * "Vue" using a static version. And version might be like '17.x' or '>=12' or '3.4 - 3.9.
 *
 * This is useful if there is no wait to infer the version or version range automatically from files
 * in the repo, or you just want more control at the cost of manual updates when ever it changes.
 *
 * TODO: Make a variation that accepts a version number for `foo >= 1` instead of using just
 * `dependency: foo`. This is already supported on the Generic Page but it can be easier here.
 */
export function dependency(
  name: string,
  registry: REGISTRY,
  logoAppearance: TLogoAppearance
) {
  const url = `${registry}/${name}`;

  return genericBadge(
    STATIC_DEPENDENCY.label!,
    name,
    STATIC_DEPENDENCY.color!,
    STATIC_DEPENDENCY.isLarge,
    url,
    logoAppearance.logo,
    logoAppearance.logoColor
  );
}

/**
 * Dynamic Node package badge.
 *
 * The badge will dynamically display the locked version number of a named package which is set in
 * your repo's package.json file.
 *
 * Note - the badge URL needs something added to work for dev dependencies. I'm happy to not support
 * that now.
 *
 * Shields.io does Pipenv lock files, but not requirements.txt file, it seems. And not Gemfile
 * either.
 */
export function nodeVersionBadge(
  repo: Repo,
  pkgName: string,
  logoAppearance: TLogoAppearance,
  environment: ENVIRONMENT
) {
  const altText = `Package - ${pkgName}`;

  logoAppearance.isLarge = NODE_VERSION_BADGE.IS_LARGE;
  const baseImageUrl = nodePkgJsonShieldUrl(repo, pkgName, environment),
    params = logoQueryParams(logoAppearance),
    imageTarget = buildUrl(baseImageUrl, params);

  const linkTarget = `${REGISTRY.Node}/${pkgName}`;

  return mdImageWithLink({
    altText,
    imageTarget,
    linkTarget,
  });
}

// TODO: Add to Packages view or Repo view.
// TODO: Accept Repo type.
/**
 * Return a Go badge that reflects the Go version in a repo's go.mod file.
 */
export function goVersionBadge(username: string, repoName: string) {
  const baseImageUrl = `${SHIELDS_API.GO_MODULE}/${username}/${repoName}`;
  const params = logoQueryParams(GO_MODULE_SHIELD);
  const imageTarget = buildUrl(baseImageUrl, params);

  const { altText, linkTarget } = GO_MODULE_SHIELD;

  return mdImageWithLink({
    altText,
    imageTarget,
    linkTarget,
  });
}
