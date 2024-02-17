import type { APIRoute } from "astro";
export async function GET({ params, redirect }:{ params:any, redirect:(location:string,status?:number) => APIRoute }): Promise<APIRoute> {
	const { path } = params;
	const redirectedPath = path.join('/');
	return redirect(`/${redirectedPath}`, 308);
}
