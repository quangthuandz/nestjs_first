import { Expose, Transform } from "class-transformer";


export class ReportDto{

    @Expose()
    id: number;
    
    @Expose()
    title: string;

    @Expose()
    releaseDate: Date

    @Transform(({obj}) => obj.id)
    @Expose()
    userId: number
}