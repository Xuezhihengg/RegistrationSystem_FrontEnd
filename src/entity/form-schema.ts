import * as v from "valibot";

export const NewExamSchema = v.object({
  examId: v.pipe(v.string(), v.nonEmpty(), v.uuid()),
  batchId: v.pipe(v.string(), v.nonEmpty(), v.uuid()),
  examName: v.pipe(v.string(), v.nonEmpty()),
  campus: v.pipe(v.string(), v.nonEmpty()),
  address: v.pipe(v.string(), v.nonEmpty()),
  startTime: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
  ),
  endTime: v.pipe(
    v.string(),
    v.nonEmpty(),
    v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/),
  ),
});

export type NewExamType = v.InferInput<typeof NewExamSchema>;

export const NewSignUpSchema = v.object({
  personnelId: v.pipe(v.string(), v.nonEmpty()),
  examId: v.pipe(v.string(), v.nonEmpty(), v.uuid()),
  duty: v.pipe(v.string(), v.nonEmpty()),
  invitedBy: v.pipe(v.string(), v.nonEmpty()),
});

export type NewSignUpType = v.InferInput<typeof NewSignUpSchema>;
