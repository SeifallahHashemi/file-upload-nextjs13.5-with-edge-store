import { initEdgeStore } from '@edgestore/server';
import {CreateContextOptions, createEdgeStoreNextHandler} from '@edgestore/server/adapters/next/app';
import {z} from "zod";

type Context = {
    userId: string;
    userRole: 'admin' | 'user';
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
   // const { id, role } = await getUserSession(req); // replace with your own session logic

    return {
        userId: "sepehr_123",
        userRole: "admin",
    };
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket().path(({ ctx }) => [{ owner: ctx.userId}])
        .accessControl({
            OR: [
                {
                    // this will make sure that only the author of the file can access it
                    userId: { path: 'owner' },
                },
                {
                    // or if the user is an admin
                    userRole: {
                        eq: 'admin',
                    }, // same as { userRole: 'admin' }
                },
            ],
        }),
    myPublicImages: es.imageBucket({
        accept: ['image/jpeg', 'image/png'],
    }).input(
        z.object({
            type: z.enum(["post", "profile"])
        })
    ).path(({input}) => [{ type: input.type }]),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;