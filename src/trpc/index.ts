import { privateProcedure, publicProcedure, router } from './trpc';
import {db} from '@/db'

export const select = {
  id: true,
  createdAt: true,
  name: true,
};

export const appRouter = router({
  test: publicProcedure.query(() => {
    return 'hello'
  }),

  getUserProjects: privateProcedure.query(async({ctx}) => {
    const { userId, user } = ctx
    return await db.project.findMany({
        where: {
          memberships: {
            some: {
              userId,
            },
          },
        },
        select,
      });
  })
});
 
export type AppRouter = typeof appRouter;
