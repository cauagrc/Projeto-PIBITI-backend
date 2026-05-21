import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversaDto, UpdateConversaDto } from './conversas.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { conversation } from '@prisma/client';

@Injectable()
export class ConversasService {
  constructor(
    private usersService: UsuariosService,
    private readonly prisma: PrismaService
  ) { }

  async betweenUsers(userIds: number[]) {
    return this.prisma.conversation.findFirst({
      where: {
        AND: [
          ...userIds.map(id => ({
            users: {
              some: { id }
            }
          })),
        ]
      }
    })
  }

  async create(createConversaDto: CreateConversaDto) {
    const { userIDs } = createConversaDto;

    const users = await this.usersService.findUsers(userIDs);

    if (users.length != 2) {
      throw new NotFoundException('Usuario(s) nao encontrado(s)')
    }

    const conversas = await this.betweenUsers(userIDs);

    if (conversas) {
      throw new ConflictException('Existe uma conversa entre os usuarios');
    }

    return this.prisma.conversation.create({
      data: {
        users: {
          connect: userIDs.map(id => ({ id }))
        }
      },
      include: {
        users: true
      }
    })
  }

  async findAll(userID: number) {
    return this.prisma.conversation.findMany({
      where: {
        users: {
          some: { id: userID }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            author: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }

  async findOne(id: number) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        users: true
      }
    })
  }

  async update(id: number, updateConversaDto: UpdateConversaDto): Promise<conversation> {
    return this.prisma.conversation.update({
      where: {id},
      data: {}
    })
  }

  async remove(id: number): Promise<conversation> {
    const conversa = await this.findOne(id);

    if (!conversa) {
      throw new NotFoundException("Conversa nao encontrada")
    }

    return this.prisma.conversation.delete({
      where: { id },
      include: {
        users: true,
        messages: {
          include: {
            author: true,
          }
        }
      }
    });
  }

  async findAllMessages(userId: number, conversation_id: number, lastMessageId?: number) {
    const conversa = await this.prisma.conversation.findFirst({
      where: {
        id: conversation_id,
        users: {
          some: {
            id: userId,
          },
        },
      },
    });

    if (!conversa) {
      throw new ForbiddenException(`Você não pertence à conversa ${conversation_id}`);
    }

    const messages = await this.prisma.message.findMany({
      where: { conversation_id },
      //Limite de mensagens carregadas por requisicao
      take: 50,
      skip: lastMessageId ? 1 : 0,
      cursor: lastMessageId ? { id: lastMessageId } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            id: true,
            nome: true
          },
        },
      },
    });

    return messages.reverse();
  }

  async validateAccess(userId: number, conversationId: number) {
    const conversa = await this.findOne(conversationId);

    //Lanca exception que sera tratado por quem chamar a funcao
    if (!conversa) {
      throw new NotFoundException();
    }

    const hasAccess = conversa.users.some((u) => u.id === userId);

    //Lanca exception que sera tratado por quem chamar a funcao
    if (!hasAccess) {
      throw new ForbiddenException();
    }

    return conversa
  }

  async joinConversation(userId: number, conversationId: number) {
    const conversa = await this.validateAccess(userId, conversationId);

    const otherUser = conversa.users.find((u) => u.id !== userId);

    return {
      id: conversa.id,
      nome: otherUser ? otherUser.nome : "Conta deletada"
    }
  }
}