import { KhuyenMaiEntity } from '../../Api/Admin/entities/khuyen-mai.entity';
import type { SeederContext } from './context';

export async function seedKhuyenMai(context: SeederContext) {
  const repo = context.dataSource.getRepository(KhuyenMaiEntity);
  const promoCodes = [
    'HETHONG20',
    'FREESHIPDN',
    'NEW50K',
    'PAUSE15',
    'WEEKEND30',
    'SAVE10MAX',
  ];

  await repo
    .createQueryBuilder()
    .delete()
    .where('ma_khuyen_mai IN (:...codes)', { codes: promoCodes })
    .execute();

  await repo.save([
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Giảm 20% toàn hệ thống',
      ma_khuyen_mai: 'HETHONG20',
      loai_khuyen_mai: 'phan_tram',
      gia_tri_khuyen_mai: 20,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 50000,
      so_luot_toi_da: null,
      so_luot_da_dung: 315,
      thoi_gian_bat_dau: new Date('2026-04-08T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-20T23:59:59'),
      trang_thai: 'dang_dien_ra',
      mo_ta: 'Đơn tối thiểu 50.000đ',
    },
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Miễn phí vận chuyển toàn sàn',
      ma_khuyen_mai: 'FREESHIPDN',
      loai_khuyen_mai: 'mien_phi_van_chuyen',
      gia_tri_khuyen_mai: 0,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 80000,
      so_luot_toi_da: null,
      so_luot_da_dung: 124,
      thoi_gian_bat_dau: new Date('2026-04-10T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-15T23:59:59'),
      trang_thai: 'dang_dien_ra',
      mo_ta: 'Đơn tối thiểu 80.000đ',
    },
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Ưu đãi khách hàng mới 50k',
      ma_khuyen_mai: 'NEW50K',
      loai_khuyen_mai: 'so_tien',
      gia_tri_khuyen_mai: 50000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 150000,
      so_luot_toi_da: null,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: new Date('2026-04-14T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-25T23:59:59'),
      trang_thai: 'sap_dien_ra',
      mo_ta: 'Đơn tối thiểu 150.000đ',
    },
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Giảm 15% cuối tuần',
      ma_khuyen_mai: 'PAUSE15',
      loai_khuyen_mai: 'phan_tram',
      gia_tri_khuyen_mai: 15,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 100000,
      so_luot_toi_da: null,
      so_luot_da_dung: 48,
      thoi_gian_bat_dau: new Date('2026-04-09T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-18T23:59:59'),
      trang_thai: 'tam_dung',
      mo_ta: 'Đơn tối thiểu 100.000đ',
    },
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Flash sale giảm 30k',
      ma_khuyen_mai: 'WEEKEND30',
      loai_khuyen_mai: 'so_tien',
      gia_tri_khuyen_mai: 30000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 120000,
      so_luot_toi_da: null,
      so_luot_da_dung: 402,
      thoi_gian_bat_dau: new Date('2026-04-01T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-05T23:59:59'),
      trang_thai: 'da_ket_thuc',
      mo_ta: 'Đơn tối thiểu 120.000đ',
    },
    {
      pham_vi_ap_dung: 'he_thong',
      id_cua_hang: null,
      ten_khuyen_mai: 'Giảm 10% hóa đơn lớn',
      ma_khuyen_mai: 'SAVE10MAX',
      loai_khuyen_mai: 'phan_tram',
      gia_tri_khuyen_mai: 10,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 300000,
      so_luot_toi_da: null,
      so_luot_da_dung: 510,
      thoi_gian_bat_dau: new Date('2026-04-07T00:00:00'),
      thoi_gian_ket_thuc: new Date('2026-04-30T23:59:59'),
      trang_thai: 'dang_dien_ra',
      mo_ta: 'Đơn tối thiểu 300.000đ',
    },
  ]);
}
