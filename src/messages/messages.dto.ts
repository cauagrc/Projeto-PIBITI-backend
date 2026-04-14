import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({
        description: 'ID do autor da mensagem',
        example: '1'
    })
    @IsString()
    authorId: string

    @ApiProperty({
        description: 'ID da conversa',
        example: '1'
    })
    @IsString()
    conversationId: string

    @ApiProperty({
        description: "Mensagem de texto do usuário",
        example: "Olá!"
    })
    @IsString()
    content: string
}

export class UpdateMessageDto  {
    @ApiProperty({
        description: "Mensagem de texto do usuário",
        example: "Olá!"
    })
    @IsString()
    content: string
}