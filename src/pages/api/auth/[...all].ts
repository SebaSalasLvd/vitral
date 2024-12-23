import type { APIRoute } from "astro";
import { auth } from "../../../lib/auth.config";
export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
  return auth.handler(ctx.request)
}