// const isAuthenticated = t.middleware(({ next, ctx }) => {
//   if (!ctx.user) {
//     throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
//   }
//   return next({
//     ctx: {
//       user: ctx.user,
//     },
//   });
// });

// const isAdmin = t.middleware(({ next, ctx }) => {
//   if (!ctx.user || ctx.user.role !== 'admin') {
//     throw new TRPCError({ message: 'Unauthorized', code: 'UNAUTHORIZED' });
//   }
//   return next({
//     ctx: {
//       user: ctx.user,
//     },
//   });
// });
