import { db } from "@main/models_v2/drizzle"
import { migrate } from "drizzle-orm/vercel-postgres/migrator"

async function main() {
    await migrate(db, { migrationsFolder : "./drizzle" })
}

main()
