import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAccountController } from './admin-account.controller';
import { AdminAccountService } from './admin-account.service';
import { NguoiDungEntity } from '../Auth/entities/nguoi-dung.entity';
import { PhienDangNhapEntity } from '../Auth/entities/phien-dang-nhap.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NguoiDungEntity, PhienDangNhapEntity])],
  controllers: [AdminAccountController],
  providers: [AdminAccountService],
})
export class AdminModule {}
