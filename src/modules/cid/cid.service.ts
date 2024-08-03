import { Injectable } from '@nestjs/common';
import { CreateCidDto } from './dto/create-cid.dto';
import { UpdateCidDto } from './dto/update-cid.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CidDTO } from './dto/cid.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CidService {
  constructor(private prisma: PrismaService) {}

  create(createCidDto: CidDTO, prismaInstance?: Prisma.TransactionClient) {
    //This evole using transaction
    const prismaClient = prismaInstance || this.prisma;
    return prismaClient.cid.create({ data: createCidDto });
  }

  findAll() {
    return `This action returns all cid`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cid`;
  }

  update(id: number, updateCidDto: UpdateCidDto) {
    return `This action updates a #${id} cid`;
  }

  remove(id: number) {
    return `This action removes a #${id} cid`;
  }
}
