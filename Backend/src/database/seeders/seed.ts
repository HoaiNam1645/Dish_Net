import "dotenv/config";
import AppDataSource from "../data-source";
import { createSeederContext } from "./context";
import { seedNguoiDung } from "./nguoi-dung.seed";
import { seedYeuCauNangCap } from "./yeu-cau-nang-cap.seed";
import { seedTepDinhKem } from "./tep-dinh-kem.seed";
import { seedNhatKyHeThong } from "./nhat-ky-he-thong.seed";
import { seedYeuCauHoTro } from "./yeu-cau-ho-tro.seed";
import { seedBaoCao } from "./bao-cao.seed";
import { seedNoiDungBaoCao } from "./noi-dung-bao-cao.seed";
import { seedKhuyenMai } from "./khuyen-mai.seed";
import { seedDonHang } from "./don-hang.seed";

async function run() {
  await AppDataSource.initialize();

  try {
    const context = createSeederContext(AppDataSource);
    const { defaultPassword } = await seedNguoiDung(context);
    await seedYeuCauNangCap(context);
    await seedTepDinhKem(context);
    await seedNhatKyHeThong(context);
    await seedYeuCauHoTro(context);
    await seedNoiDungBaoCao(context);
    await seedBaoCao(context);
    await seedKhuyenMai(context);
    await seedDonHang(context);

    console.log("Seed thanh cong:");
    console.log("  - admin@dishnet.vn / " + defaultPassword);
    console.log("  - user@dishnet.vn / " + defaultPassword);
    console.log("  - creator@dishnet.vn / " + defaultPassword);
    console.log("  - store@dishnet.vn / " + defaultPassword);
    console.log("  - locked@dishnet.vn / " + defaultPassword);
    console.log("  - multi@dishnet.vn / " + defaultPassword);
  } finally {
    await AppDataSource.destroy();
  }
}

void run().catch((error: unknown) => {
  console.error("Seed that bai:", error);
  process.exit(1);
});
