import { Pool, QueryResult } from 'pg';
declare const pool: Pool;
export declare const query: (text: string, params?: any[]) => Promise<QueryResult<any>>;
export default pool;
//# sourceMappingURL=db.d.ts.map