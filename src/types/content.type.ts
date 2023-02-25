import { z } from "zod";

// content
export const ContentSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string({
      required_error: "Title is required",
    }),
    subtitle: z.string().optional(),
    description: z.string({
      required_error: "Title is required",
    }),
    subdescription: z.string().optional(),
    lesson_id: z.string({ required_error: "lesson_id is required" }).uuid(),
  });
  export const ContentUpdateDTOSchema = ContentSchema.extend({
    id: z.string().uuid().optional(),
    title: z.string().optional(),
    description: z.string().optional(), 
    lesson_id: z.string().uuid().optional(),
  });
  export type Content = z.infer<
    typeof ContentSchema | typeof ContentUpdateDTOSchema
  >;
  
  