import { Pool, type QueryResultRow } from "pg";

/**
 * Singleton PostgreSQL connection pool.
 * Uses DATABASE_URL from environment variables.
 */

let pool: Pool | undefined;

function getPool(): Pool {
    if (!pool) {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL environment variable is not set");
        }
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            idleTimeoutMillis: 30_000,
            connectionTimeoutMillis: 5_000,
        });
    }
    return pool;
}

/**
 * Execute a parameterised SQL query and return typed rows.
 *
 * @example
 * const rows = await query<Contact>(
 *   "SELECT * FROM contacts WHERE email = $1",
 *   [email],
 * );
 */
export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[],
) {
    const client = await getPool().connect();
    try {
        const result = await client.query<T>(text, params);
        return result;
    } finally {
        client.release();
    }
}

export default getPool;
