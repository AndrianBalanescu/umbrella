import type { IObjectOf } from "@thi.ng/api";

export const RE_PKG = /@thi\.ng\/[a-z0-9-]+/g;
export const RE_USER = /@([a-z0-9_-]+)/gi;
export const RE_PARTIAL = /\$\{([a-z.]+)\}/gi;
export const RE_IS_HEADING = /^#{2,4}\s/;
export const RE_HEADING = /^(#{2,4})\s(.+)/;
export const PATTERN_TOC = "<!-- TOC -->";
export const PATTERN_NO_TOC = "<!-- NOTOC -->";

export const META_FIELD = "thi.ng";

export interface BaseConfig {
    repoURL: string;
    userURL: string;
    assetURL: string;
    bannerURL: string;
    bannerBasePath: string;
    demoURL: string;
    docURL: string;
    exampleDir: string;
    mainAuthor: string;
    license: string;
    pkgScope: string;
    statuses: IObjectOf<string>;
}

export interface Config extends BaseConfig {
    root: Package;
    meta: PackageMeta;
    branchURL: string;
}

export interface Package {
    name: string;
    description: string;
    version: string;
    dependencies?: IObjectOf<string>;
    keywords?: string[];
    [META_FIELD]?: Partial<PackageMeta>;
}

export interface PackageMeta {
    blog: BlogPost[];
    branch: string;
    online: boolean;
    parent: string;
    readme: string[] | boolean;
    related: string[];
    screenshot: string;
    skip: boolean;
    status: string;
    year: number;
}

export interface BlogPost {
    title: string;
    url: string;
}
