==Icons==
pnpm add react-icons@latest dayjs@latest

exact version in setup example
pnpm add react-icons@1.11.6 dayjs@1.11.6

==Prisma DB==
pnpm, prisma
to update schema: pnpm prisma db push
run prisma studio: pnpm prisma studio

==Redirect==
Add redirect:
on local:
http://localhost:3000/api/auth/callback/discord

add another redirect in Discord Oauth2 page for hosted/live sites
==Discord==
https://discord.com/developers/applications
get CLIENT ID, CLIENT SECRET
IDs included in .env

==Router==
Primary router in server/api/root.ts
manually add routers used in /api/routers

==User actions==
create post: router in /server/routers/post.ts. FE user form in components/CreatePost.tsx
