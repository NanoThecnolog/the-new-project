import { Injectable } from '@nestjs/common';
import { debug } from 'utils/debuglog';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async getData(email: string, id: string) {
    const data = { email, id }
    console.log(data)
    return this.prisma.user.create({
      data: {
        email,
        req_id: id
      }
    })
  }
  getHello(): string {
    return 'Hello World!';
  }
}