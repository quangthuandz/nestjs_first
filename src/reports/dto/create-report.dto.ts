import { IsDate, IsString } from "class-validator";

export class CreateReportDto {

    @IsString()
    title: string;

    @IsDate()
    releaseDat: Date;
}
