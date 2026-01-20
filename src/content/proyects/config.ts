import { defineCollection, z } from "astro:content";

const proyects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        date: z.number(),
        description: z.string(),
        imagen: z.string(),
        collage: z.array(z.string()).optional(), 
    }),
});

export const collections = { proyects };