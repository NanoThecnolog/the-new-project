import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  /**
   * checks if the backend is online
   * @returns return a object with code and message properties
   */

  getHello() {
    return {
      code: 200,
      message: "Why don't skeletons fight each other? Because they don't have the guts!",
    }
  }

  /**
   * Creates a new user entry in the database
   * @param email email of the user
   * @param id req_id of the newsletter
   * @returns the created user data or undefined if `email` and `id` are not provided
   */

  async setData(email: string, id: string) {
    if (!email && !id) return
    try {
      await this.prisma.user.create({
        data: {
          email,
          req_id: id
        }
      })
      return {
        code: 200,
        message: "Data saved in db"
      }
    } catch (err) {
      throw new InternalServerErrorException("Failed to saved data in the database...")
    }

  }
  /**
   * Retrieves users from DB with pagination and optional filters
   * @param page current page number (1 by default)
   * @param pageSize users per page
   * @param filters optional filters for the query
   * @param filters.email filter users by email (partial match, case insensitive)
   * @param filters.req_id filter users by req_id (exact match)
   * @returns Return a paginated list of users based the applied fitlers.
   */

  async getDataDB(page: number, pageSize: number, filters?: { email?: string, req_id?: string }) {
    const where: Prisma.UserWhereInput = {
      email: filters?.email ? { contains: filters.email, mode: 'insensitive' } : undefined,
      req_id: filters?.req_id ? { equals: filters.req_id } : undefined,
    }
    const dataDB = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where, select: {
        id: true,
        email: true,
        req_id: true,
      }
    });
    const totalResults = await this.prisma.user.count({ where })
    const totalPages = Math.ceil(totalResults / pageSize)
    return {
      code: 200,
      page,
      pageSize,
      totalResults,
      totalPages,
      data: dataDB
    }
  }

  /**
   * 
   * @param email filter user data by email (exact match)
   * @returns Return a list of entries in the database that match the email provided
   */

  async getUserData(email: string) {
    const userData = await this.prisma.user.findMany({
      where: { email }
    })
    if (userData.length === 0) throw new NotFoundException("Nenhum usuário encontrado com esse email")
    return {
      code: 200,
      data: userData,
      count: userData.length
    }
  }
}