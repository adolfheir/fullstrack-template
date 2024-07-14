export type RequireSomeKey<T, K extends keyof T> = T & Required<Pick<T, K>>;
