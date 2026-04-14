import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, UpdateMessageDto } from './messages.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly prisma: PrismaService
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const { authorId, conversationId, content } = createMessageDto;

    return this.prisma.message.create({
      data: {
        author_id: +authorId,
        conversation_id: +conversationId,
        content: content
      },
      include: {
        author: true,
        conversation: true
      }
    })
  }

  async findAll(userId: number) {
    return this.usersService.findAllMessages(userId);
  }

  async findOne(id: number): Promise <message | null> {
    return this.prisma.message.findUnique({
      where: {id}
    })
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise <message | undefined> {
    const getMessage = await this.findOne(id);

    if(!getMessage) {
      throw new NotFoundException('Mensagem nao encontrada');
    }

    if(getMessage.edited) {
      throw new ConflictException("Mensagem ja foi editada");
    }

    return this.prisma.message.update({
      where: {id}, 
      data: {
        ...updateMessageDto,
        edited: true
      },
      include: {
        author: true,
        conversation: true,
      }
    })
  }

  remove(id: number) {
    return this.prisma.message.delete({
      where: {id},
      include: {
        author: true,
        conversation: {
          include: {
            users: true,
          }
        }
      }
    })
  }
}