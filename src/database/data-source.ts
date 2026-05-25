import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.dev" }); 

const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URI as string,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});

export default AppDataSource;