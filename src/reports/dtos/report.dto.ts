import { IsString, IsNumber,Min, Max, IsLatitude, IsLongitude, IsBoolean } from "class-validator";
import { User } from "../../users/user.entity";

export class ReportDto {
    @IsNumber()
    price: number;
    @IsString()
    make: string;
    @IsString()
    model: string;
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year:number;
    @IsNumber()
    @IsLatitude()
    lat:number;
    
    @IsNumber()
    @IsLongitude()
    lng:number;
    
    @IsNumber()
    mileage:number;

    @IsBoolean()
    approved: boolean;
    
    user:User;
   
}