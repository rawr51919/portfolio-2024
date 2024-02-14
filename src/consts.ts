// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
// Website metadata
export const SITE_URL: string = "https://portfolio2024.vercel.app/";
export const SITE_TITLE: string = "rawr51919's Portfolio";
export const SITE_DESCRIPTION: string = "rawr51919's Portfolio Website";
// Navigation
type Page = {
	title: string;
	href: string;
	children?: Page[];
};
export const PAGES: Page[] = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "About",
		href: "/about",
	},
];
// i18n
export const DEFAULT_LOCALE = "en";
export const LOCALES = {
	en: "en", // the `defaultLocale` value must present in `locales` keys
};
