import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString, IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTopicoDto {
    
    @ApiProperty({
        description: 'Nome do topico',
        example: 'Como funciona a Permutação'
    })
    @IsString()
    nome: string

    @ApiProperty({
        description: 'descricao do tipico e que é um comentario',
        example: 'Alguem poderia me explicar sobre a permutação'
    })
    @IsString()
    @IsOptional()
    descricao?: string
      
    @ApiProperty({
        description: 'categoria do topico',
        example: 'Off-topico'
    })
    @IsString()
    categoria: string

    @ApiProperty({
        description: 'ID do usuario que criou o topico',
        example: 1
    })
    @IsNumber()
    id_usuario: number

    @ApiProperty({
        description: 'Define se o tópico é anônimo',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    anonimo?: boolean;
}

export class CreateComentarioDto {
    
    @ApiProperty({
        description: 'descricao do tipico e que é um comentario',
        example: 'Alguem poderia me explicar sobre a permutação'
    })
    @IsString()
    @IsOptional()
    descricao?: string

    @ApiProperty({
        description: 'ID do usuario que criou o comentário',
        example: 1
    })
    @IsNumber()
    id_usuario: number
    
    @ApiProperty({
        description: 'ID do tópico onde o comentário será postado',
        example: 1
    })
    @IsNumber()
    id_topico: number

    @ApiProperty({
        description: 'Define se o comentário é anônimo',
        example: false,
        required: false
    })
    @IsBoolean()
    @IsOptional()
    anonimo?: boolean;
}

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {}

export class UpdateTopicoDto extends PartialType(CreateTopicoDto) {}
