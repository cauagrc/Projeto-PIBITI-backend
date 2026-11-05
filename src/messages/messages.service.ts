import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto, UpdateMessageDto } from './messages.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly prisma: PrismaService
  ) { }

  async create(createMessageDto: CreateMessageDto) {
    const { authorId, conversationId, content } = createMessageDto;

    //verificar se existe conversationId e se tem permissao

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

  async findOne(id: number): Promise<message | null> {
    return this.prisma.message.findUnique({
      where: { id }
    })
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<message | undefined> {
    const getMessage = await this.findOne(id);

    if (!getMessage) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    if (getMessage.edited) {
      throw new ConflictException("Essa mensagem já foi editada");
    }

    return this.prisma.message.update({
      where: { id },
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

  async remove(id: number, userId: number): Promise<message> {
    const message = await this.prisma.message.findUnique({
      where: { id }
    });

    if (!message) {
      throw new NotFoundException('Mensagem não encontrada');
    }

    if (message.author_id !== userId) {
      throw new ForbiddenException('Você não pode apagar mensagens de outros usuários.');
    }

    if (message.deletedAt) {
      throw new BadRequestException('Essa mensagem já foi apagada');
    }

    return await this.prisma.message.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}