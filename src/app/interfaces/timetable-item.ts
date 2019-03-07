export interface ITimetableItem {
    id?: number;
    weekDay: number;
    lessonNumber: number;
    weekType: string;
    lessonType: string;
    auditoryID: number;
    groupID: number;
    teacherID: number;
    subjectID: number;
}