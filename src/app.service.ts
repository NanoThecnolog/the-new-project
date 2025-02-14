import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getHello() {
    return {
      code: 200,
      message: "Why don't skeletons fight each other? Because they don't have the guts!",
    }
  }

  async setData(email: string, id: string) {
    if (!email && !id) return
    try {
      return await this.prisma.user.create({
        data: {
          email,
          req_id: id
        }
      })
    } catch (err) {
      throw new InternalServerErrorException('Erro ao salvar dados no banco de dados')
    }
  }

  async getDataDB(page: number, pageSize: number) {
    return await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async getUserData(email: string) {
    return await this.prisma.user.findMany({
      where: { email }
    })
  }
}