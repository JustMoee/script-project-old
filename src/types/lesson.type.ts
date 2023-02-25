import { z } from "zod";

//lesson
export const LessonSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string({
    required_error: "Title is required",
  }),
  subject_id: z.string({ required_error: "subject_id is required" }).uuid(),
  status: z.boolean().default(false),
});
export const LessonUpdateDTOSchema = LessonSchema.extend({
  id: z.string().uuid().optional(),
  title: z.string().optional(),
  subject_id: z.string().uuid().optional(),
  status: z.boolean().default(false).optional(),
});
export type Lesson = z.infer<
  typeof LessonSchema | typeof LessonUpdateDTOSchema
>;