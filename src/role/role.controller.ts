import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { CreateRoleReqDto } from './dto/create-role-req.dto';
import { RoleService } from './role.service';
import { UpdateRoleReqDto } from './dto/update-role-req.dto';
import { UpdateRolesReqDto } from './dto/update-roles-req.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async roles(): Promise<Role[]> {
    return this.roleService.roles({});
  }

  @Get(':id')
  async role(@Param('id') id: string): Promise<Role> {
    return this.roleService.role({ id: id });
  }

  @Post()
  async createRole(@Body() createRoleReqDto: CreateRoleReqDto): Promise<Role> {
    const role: Prisma.RoleCreateInput = {
      name: createRoleReqDto.name,
      code: createRoleReqDto.code,
    };
    return this.roleService.createRole(role);
  }

  @Post('bulk')
  async createManyRoles(
    @Body() roles: CreateRoleReqDto[],
  ): Promise<Prisma.BatchPayload> {
    const data: Prisma.RoleCreateManyInput[] = roles.map((role) => ({
      name: role.name,
      code: role.code,
    }));
    return this.roleService.createManyRoles(data);
  }

  @Patch(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleReqDto: UpdateRoleReqDto,
  ): Promise<Role> {
    const role: Prisma.RoleUpdateInput = {
      name: updateRoleReqDto.name,
      code: updateRoleReqDto.code,
    };
    return this.roleService.updateRole({ where: { id: id }, data: role });
  }

  @Delete('bulk')
  async deleteManyRoles(@Body() ids: string[]): Promise<Prisma.BatchPayload> {
    const data: Prisma.RoleWhereInput = { id: { in: ids } };
    return this.roleService.deleteManyRoles(data);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<Role> {
    return this.roleService.deleteRole({ id: id });
  }
}
