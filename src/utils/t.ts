/**
 * From https://github.com/trktml/lotusforafrica/blob/main/src/utils/translationTools.ts
 */
import { getLocale } from "astro-i18n-aut";
import { DEFAULT_LOCALE, LOCALES } from "@src/consts";
import en from "@locales/en.json";
import fr from "@locales/fr.json";
const handler = {
	get(target: any, prop: any, receiver: any) {
		receiver.valueOf = () => {
			return target[prop];
		};
		return target[prop].replaceAll("\n", "<br/>");
	},
};
const en_proxy = new Proxy(en, handler);
const fr_proxy = new Proxy(fr, handler);
export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;
/**
 * Return the locale object with all the translations for a specific locale
 * @param astroUrl
 * @returns
 */
export default function t(astroUrl: URL): Locales {
	let locale = getLocale(astroUrl);
	switch (locale) {
		case "fr":
			return fr_proxy as Locales;
		case "en":
		default:
			return en_proxy as Locales;
	}
}
/**
 *
 * @param link Localize a specific path
 * @param astroUrl
 * @returns
 */
export function localizePath(link: string | URL, astroUrl: string | URL): string {
	let locale = getLocale(astroUrl);
	console.log(locale);
	let localizedLink: string = "";
	if (locale && locale !== defaultLocale) {
		let localeLink = `/${getLocale(astroUrl) ?? ""}/${link}`.replaceAll("//", "/") ?? "";
		localizedLink = localeLink;
	} else {
		localizedLink = String(link);
	}
	// localizedLink add last slash
	if (!localizedLink.endsWith("/") && !localizedLink.endsWith("/" + locale + "/") || localizedLink.endsWith("/" + locale)) {
		localizedLink += "/";
	} else if (localizedLink.endsWith("/" + locale + "/")) {
		localizedLink = localizedLink.replace("/" + locale + "/", "/");
	} else if (localizedLink.endsWith("/" + "en" + "/")) {
		localizedLink = localizedLink.replace("/" + "en" + "/", "/");
	}
	return localizedLink;
}
