import { KhuyenMaiEntity } from "../../Api/Admin/entities/khuyen-mai.entity";
import type { SeederContext } from "./context";

export async function seedKhuyenMai(context: SeederContext) {
  const repo = context.dataSource.getRepository(KhuyenMaiEntity);
  const promoCodes = [
    "HETHONG20",
    "FREESHIPDN",
    "NEW50K",
    "PAUSE15",
    "WEEKEND30",
    "SAVE10MAX",
  ];

  await repo
    .createQueryBuilder()
    .delete()
    .where("ma_khuyen_mai IN (:...codes)", { codes: promoCodes })
    .execute();

  await repo.save([
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giảm 20% toàn hệ thống",
      ma_khuyen_mai: "HETHONG20",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 20,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 50000,
      so_luot_toi_da: null,
      so_luot_da_dung: 315,
      thoi_gian_bat_dau: new Date("2026-04-08T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-20T23:59:59"),
      trang_thai: "dang_dien_ra",
      mo_ta: "Đơn tối thiểu 50.000đ",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Miễn phí vận chuyển toàn sàn",
      ma_khuyen_mai: "FREESHIPDN",
      loai_khuyen_mai: "mien_phi_van_chuyen",
      gia_tri_khuyen_mai: 0,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 80000,
      so_luot_toi_da: null,
      so_luot_da_dung: 124,
      thoi_gian_bat_dau: new Date("2026-04-10T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-15T23:59:59"),
      trang_thai: "dang_dien_ra",
      mo_ta: "Đơn tối thiểu 80.000đ",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Ưu đãi khách hàng mới 50k",
      ma_khuyen_mai: "NEW50K",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 50000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 150000,
      so_luot_toi_da: null,
      so_luot_da_dung: 0,
      thoi_gian_bat_dau: new Date("2026-04-14T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-25T23:59:59"),
      trang_thai: "sap_dien_ra",
      mo_ta: "Đơn tối thiểu 150.000đ",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giảm 15% cuối tuần",
      ma_khuyen_mai: "PAUSE15",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 15,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 100000,
      so_luot_toi_da: null,
      so_luot_da_dung: 48,
      thoi_gian_bat_dau: new Date("2026-04-09T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-18T23:59:59"),
      trang_thai: "tam_dung",
      mo_ta: "Đơn tối thiểu 100.000đ",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Flash sale giảm 30k",
      ma_khuyen_mai: "WEEKEND30",
      loai_khuyen_mai: "so_tien",
      gia_tri_khuyen_mai: 30000,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 120000,
      so_luot_toi_da: null,
      so_luot_da_dung: 402,
      thoi_gian_bat_dau: new Date("2026-04-01T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-05T23:59:59"),
      trang_thai: "da_ket_thuc",
      mo_ta: "Đơn tối thiểu 120.000đ",
    },
    {
      pham_vi_ap_dung: "he_thong",
      id_cua_hang: null,
      ten_khuyen_mai: "Giảm 10% hóa đơn lớn",
      ma_khuyen_mai: "SAVE10MAX",
      loai_khuyen_mai: "phan_tram",
      gia_tri_khuyen_mai: 10,
      gia_tri_toi_da: null,
      don_hang_toi_thieu: 300000,
      so_luot_toi_da: null,
      so_luot_da_dung: 510,
      thoi_gian_bat_dau: new Date("2026-04-07T00:00:00"),
      thoi_gian_ket_thuc: new Date("2026-04-30T23:59:59"),
      trang_thai: "dang_dien_ra",
      mo_ta: "Đơn tối thiểu 300.000đ",
    },
  ]);

  // --- Khuyến mãi cửa hàng ---
  const storePromoCodes = [
    "NETBUN25",
    "NEHUE15",
    "NETHS20",
    "QUANCOM10",
  ];

  await repo
    .createQueryBuilder()
    .delete()
    .where("ma_khuyen_mai IN (:...codes)", { codes: storePromoCodes })
    .execute();

  const storeId1 = context.storeByEmail.get("store@dishnet.vn");
  const storeId2 = context.storeByEmail.get("multi@dishnet.vn");

  if (storeId1) {
    await repo.save([
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Giảm 25% Bún Bò Huế",
        ma_khuyen_mai: "NETBUN25",
        loai_khuyen_mai: "phan_tram",
        gia_tri_khuyen_mai: 25,
        gia_tri_toi_da: 20000,
        don_hang_toi_thieu: 40000,
        so_luot_toi_da: 100,
        so_luot_da_dung: 42,
        thoi_gian_bat_dau: new Date("2026-04-01T00:00:00"),
        thoi_gian_ket_thuc: new Date("2026-04-30T23:59:59"),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giảm 25% tối đa 20.000đ cho đơn từ 40.000đ",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Miễn phí vận chuyển Nét Huế",
        ma_khuyen_mai: "NEHUE15",
        loai_khuyen_mai: "mien_phi_van_chuyen",
        gia_tri_khuyen_mai: 0,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 80000,
        so_luot_toi_da: 50,
        so_luot_da_dung: 15,
        thoi_gian_bat_dau: new Date("2026-04-10T00:00:00"),
        thoi_gian_ket_thuc: new Date("2026-04-20T23:59:59"),
        trang_thai: "dang_dien_ra",
        mo_ta: "Miễn phí ship cho đơn từ 80.000đ",
      },
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId1,
        ten_khuyen_mai: "Giảm 20k Hải Sản",
        ma_khuyen_mai: "NETHS20",
        loai_khuyen_mai: "so_tien",
        gia_tri_khuyen_mai: 20000,
        gia_tri_toi_da: null,
        don_hang_toi_thieu: 60000,
        so_luot_toi_da: 30,
        so_luot_da_dung: 8,
        thoi_gian_bat_dau: new Date("2026-04-12T00:00:00"),
        thoi_gian_ket_thuc: new Date("2026-04-16T23:59:59"),
        trang_thai: "sap_dien_ra",
        mo_ta: "Giảm 20.000đ cho đơn hải sản từ 60.000đ",
      },
    ]);
  }

  if (storeId2) {
    await repo.save([
      {
        pham_vi_ap_dung: "cua_hang",
        id_cua_hang: storeId2,
        ten_khuyen_mai: "Giảm 10% Cơm Bình Dân",
        ma_khuyen_mai: "QUANCOM10",
        loai_khuyen_mai: "phan_tram",
        gia_tri_khuyen_mai: 10,
        gia_tri_toi_da: 15000,
        don_hang_toi_thieu: 30000,
        so_luot_toi_da: 200,
        so_luot_da_dung: 67,
        thoi_gian_bat_dau: new Date("2026-04-05T00:00:00"),
        thoi_gian_ket_thuc: new Date("2026-04-30T23:59:59"),
        trang_thai: "dang_dien_ra",
        mo_ta: "Giảm 10% tối đa 15.000đ cho đơn từ 30.000đ",
      },
    ]);
  }
}
