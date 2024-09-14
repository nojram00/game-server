import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema : "./src/models_v2/drizzle.ts",
    dialect : "postgresql",
    dbCredentials : {
        connectionString : process.env.POSTGRES_URL ?? "postgres://default:qSVCep9gW4Ui@ep-cold-bonus-a4u71alc-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
        url : process.env.POSTGRES_URL ?? "postgres://default:qSVCep9gW4Ui@ep-cold-bonus-a4u71alc-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
        database : process.env.POSTGRES_DATABASE ?? "verceldb"
    }
});
