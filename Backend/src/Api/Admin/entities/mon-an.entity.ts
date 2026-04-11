import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mon_an')
export class MonAnEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  id_cua_hang: number;

  @Column({ type: 'varchar', length: 50 })
  ma_mon: string;

  @Column({ type: 'varchar', length: 255 })
  ten_mon: string;

  @Column({ type: 'text', nullable: true })
  mo_ta: string | null;

  @Column({ type: 'text', nullable: true })
  hinh_anh_dai_dien: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0 })
  gia_ban: number;

  @Column({ type: 'varchar', length: 20, default: 'dang_ban' })
  trang_thai_ban: string;
}
