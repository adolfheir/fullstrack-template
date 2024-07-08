# 开发环境

## 运行pg

cd ./docker-file bash ./restart.sh

## 同步schema => db

```
// 生产迁移文件 xxx 代表这次操作名称
pnpm -r --filter @fullstrack/server run prisma migrate dev --name xxx

// 强制同步
pnpm -r --filter @fullstrack/server run prisma db push

// 重置数据库
pnpm -r --filter @fullstrack/server run prisma migrate reset

```

## 生成ts定义文件

```
pnpm -r --filter @fullstrack/server run prisma generate

```
