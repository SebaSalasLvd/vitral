import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth.config";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const isAuthed = await auth.api.getSession({ headers: ctx.request.headers });

  return next()
});
