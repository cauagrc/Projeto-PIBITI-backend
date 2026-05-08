import { Injectable } from '@nestjs/common';
import { CreateConversaDto, UpdateConversaDto } from './conversas.dto';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { conversation } from '@prisma/client';

@Injectable()
export class ConversasService {
  constructor(
    private usersService: UsuariosService,
    private readonly prisma: PrismaService
  ) {}
  
  async create(createConversaDto: CreateConversaDto) {
    const { userIDs } = createConversaDto;

    const users = await this.usersService.findUsers(userIDs);

    if(users.length != 2) {
      throw new Error(`Usuario invalido.`);
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

  async findOne(id: number): Promise<conversation | null> {
    return this.prisma.conversation.findUnique({
      where: {id}
    })
  }

  async update(id: number, updateConversaDto: UpdateConversaDto): Promise<conversation> {
    return this.prisma.conversation.update({
      where: {id},
      data: {}
    })
  }

  async remove(id: number): Promise<conversation> {
    return this.prisma.conversation.delete({
      where: {id}
    });
  }
}