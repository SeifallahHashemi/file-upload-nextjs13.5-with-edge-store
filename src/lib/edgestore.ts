'use client';

import { createEdgeStoreProvider } from '@edgestore/react';
import {EdgeStoreRouter} from "../../../tanstack-query/src/app/api/edgestore/[...edgestore]/route";

const { EdgeStoreProvider, useEdgeStore } =
    createEdgeStoreProvider<EdgeStoreRouter>({
        maxConcurrentUploads: 2,
    });

export { EdgeStoreProvider, useEdgeStore };