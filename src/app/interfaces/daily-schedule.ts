import { ITimetableItem } from "./timetable-item";

export interface IDailySchedule {
    "weekDay": number;
    "timetableItems": ITimetableItem[]
}