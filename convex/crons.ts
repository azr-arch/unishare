import { cronJobs } from "convex/server";
import { api, internal } from "./_generated/api";

const crons = cronJobs();

// Remove file that are older than a week
crons.daily(
    "Remove expired files",
    {
        hourUTC: 18, // Fill this accordingly to IST timezone, so that the job should be done at 12:00 am
        minuteUTC: 30,
    },
    internal.file.deleteExpiredFiles
);

export default crons;
