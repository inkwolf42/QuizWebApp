import type { Auth } from '@/types/auth';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
declare function route(name: string, params?: Record<string, any>, absolute?: boolean): string;
declare function route(name: string, path_param:any , params?: Record<string, any>, absolute?: boolean): string;
