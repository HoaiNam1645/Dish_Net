import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRevenueSourceColumnsToDonHang1775813000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasIdBaiVietNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_bai_viet_nguon",
    );
    const hasIdNhaSangTaoNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_nha_sang_tao_nguon",
    );

    if (!hasIdBaiVietNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN id_bai_viet_nguon BIGINT UNSIGNED NULL AFTER nguon_don_hang
      `);
    }

    if (!hasIdNhaSangTaoNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        ADD COLUMN id_nha_sang_tao_nguon BIGINT UNSIGNED NULL AFTER id_bai_viet_nguon
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasIdNhaSangTaoNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_nha_sang_tao_nguon",
    );
    const hasIdBaiVietNguon = await queryRunner.hasColumn(
      "don_hang",
      "id_bai_viet_nguon",
    );

    if (hasIdNhaSangTaoNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        DROP COLUMN id_nha_sang_tao_nguon
      `);
    }

    if (hasIdBaiVietNguon) {
      await queryRunner.query(`
        ALTER TABLE don_hang
        DROP COLUMN id_bai_viet_nguon
      `);
    }
  }
}
