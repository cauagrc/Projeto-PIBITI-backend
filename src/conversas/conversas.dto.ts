import { PartialType } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversaDto {
    @ApiProperty({
        description: 'IDs dos usuários',
        example: '[1,2]'
    })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    userIDs: number[]
}

export class UpdateConversaDto extends PartialType(CreateConversaDto) {

}