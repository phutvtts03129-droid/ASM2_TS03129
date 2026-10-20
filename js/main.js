import { sanPham } from "./products.js";
import { hienthi, banchay, sanPhamMoi} from "./product.js";
import { hiengio, tongtien } from "./giohang.js";
import { hienthidonhang } from "./donhang.js";




hienthidonhang();

// Hiển thị sản phẩm ở trang chủ
hienthi(sanPham, "list");
banchay();
sanPhamMoi();

// Hiển thị giỏ hàng nếu đang ở trang giỏ hàng
hiengio();
tongtien();