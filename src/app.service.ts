import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async getData(email: string, id: string) {
    const data = { email, id }
    //console.log(data)
    return this.prisma.user.create({
      data: {
        email,
        req_id: id
      }
    })
  }
  getHello() {
    return {
      code: 200,
      message: "Why don't skeletons fight each other? Because they don't have the guts!",
    }
  }
}