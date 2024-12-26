import { betterAuth } from "better-auth";
import pg from 'pg';
const {Pool} = pg;

export const auth = betterAuth({
    database: new Pool({
        host: import.meta.env.POSTGRES_HOST,
        user: import.meta.env.POSTGRES_USER,
        password: import.meta.env.POSTGRES_PASSWORD,
        database: import.meta.env.POSTGRES_DATABASE
    }),
    emailAndPassword: {
        enabled: true
    },
     socialProviders:{
        github: {
            clientId: import.meta.env.GITHUB_CLIENT_ID as string,
            clientSecret: import.meta.env.GITHUB_CLIENT_SECRET as string
        }
    }
})