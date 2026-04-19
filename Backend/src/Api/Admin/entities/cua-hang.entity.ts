import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("cua_hang")
export class CuaHangEntity {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true })
  id: number;

  @Column({ type: "bigint", unsigned: true })
  id_chu_so_huu: number;

  @Column({ type: "varchar", length: 255 })
  ten_cua_hang: string;

  @Column({ type: "varchar", length: 255 })
  slug: string;

  @Column({ type: "text", nullable: true })
  mo_ta: string | null;

  @Column({ type: "text", nullable: true })
  anh_dai_dien: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  so_dien_thoai_lien_he: string | null;

  @Column({ type: "text" })
  dia_chi_kinh_doanh: string;

  @Column({ type: "time", nullable: true })
  gio_mo_cua: string | null;

  @Column({ type: "time", nullable: true })
  gio_dong_cua: string | null;

  @Column({ type: "varchar", length: 20, default: "cho_duyet" })
  trang_thai_hoat_dong: string;

  @Column({ type: "decimal", precision: 4, scale: 2, default: 0 })
  diem_danh_gia: number;
}
