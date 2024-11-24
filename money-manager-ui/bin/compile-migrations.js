import { readMigrationFiles } from 'drizzle-orm/migrator';
import { join, dirname } from 'path';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const migrationsFolder = join(__dirname, '../src/db/migrations');
const migrations = readMigrationFiles({ migrationsFolder });

const outputPath = join(__dirname, '../src/db/migrations/migrations.json');

try {
    await writeFile(outputPath, JSON.stringify(migrations, null, 2));
    console.log('Migrations compiled!');
} catch (err) {
    console.error('Failed to write migrations:', err);
}
