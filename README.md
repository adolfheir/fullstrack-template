# 开发环境

## 本地运行postgres 

pnpm -r --filter @fullstrack/devops run start 

## prisma

```
// 生产迁移文件 xxx 代表这次操作名称
pnpm -r --filter @fullstrack/db run prisma migrate dev --name xxx

// 重置数据库
pnpm -r --filter @fullstrack/db run prisma migrate reset

// 强制同步
pnpm -r --filter @fullstrack/db run prisma db push

// 播种数据
pnpm -r --filter @fullstrack/db  run seed    

// 生成ts定义文件
pnpm -r --filter @fullstrack/db run prisma generate

```

## 生产tprc类型定义文件

```
pnpm -r --filter @fullstrack/api run build

```

## run

```
pnpm -r --filter @fullstrack/api run dev

pnpm -r --filter @fullstrack/web run dev

```