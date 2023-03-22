## Web app for a basic social media site. Using T3 stack:

- Typescript
- Next.js
- NextAuth.js
- Tailwind CSS
- Prisma
- tRPC

### User authentication with NextAuth

- Currently supports log in for Discord users.

### Make social post

- Make plain text post. Date/time tracking with Day.js library.
- Like / Unlike posts, update post's 'like' status and count in real time.

### Timeline model

- Public posts displayed on timeline. Can sort only posts from a specific user.
- Infinite scroll capability from tRPC useInfiniteQuery
