import { config } from "dotenv"
config()

import { seed as seedUsers } from "./users"

seedUsers()
    .then((count) => {
        console.log(`Seeding complete. Inserted ${count ?? "?"} users.`)
        process.exit(0)
    })
    .catch((err) => {
        console.error("Error seeding data:", err)
        process.exit(1)
    })
