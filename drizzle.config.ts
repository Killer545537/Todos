import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
    schema: './db/schema',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: '__drizzle_migrations',
        schema: 'public',
    },
    casing: 'snake_case',
    verbose: true,
    strict: true,
});
