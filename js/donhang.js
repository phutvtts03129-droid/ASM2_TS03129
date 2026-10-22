
let donhang = JSON.parse(localStorage.getItem("order")) || [];

// Lưu đơn hàng
function luuDonHang() {
    localStorage.setItem("order", JSON.stringify(donhang));
}

// Hiển thị đơn hàng
export function hienthidonhang(dsHienThi) {
    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let ds = dsHienThi || donhang;

    let html = ds.map(function(don) {
        let danhSachSanPham = don.sanPham || [];

        let chiTiet = danhSachSanPham.map(function(sp) {
            let ten = sp.ten || sp.name || "Sản phẩm";
            let gia = Number(sp.gia || sp.price || 0);
            let soLuong = Number(sp.quantity || 1);

            return `
                <div class="san-pham-dat">
                    <p><strong>${ten}</strong></p>
                    <p>Giá: ${gia.toLocaleString("vi-VN")}đ</p>
                    <p>Số lượng: ${soLuong}</p>
                    <p>Thành tiền:
                        ${(gia * soLuong).toLocaleString("vi-VN")}đ
                    </p>
                </div>
            `;
        }).join("");

        return `
            <div class="don-hang-rieng">
                <h3>Mã đơn hàng: ${don.id}</h3>
                <p>Người đặt: ${don.ten || "Chưa có thông tin"}</p>
                <p>Số điện thoại: ${don.sdt || "Chưa có thông tin"}</p>
                <p>Địa chỉ: ${don.diachi || "Chưa có thông tin"}</p>
                <p>Ngày đặt: ${don.ngayDat || "Chưa có thông tin"}</p>
                <p>Trạng thái: ${don.trangThai || "Chờ xác nhận"}</p>

                <h3 class="tong-tien">
                    Tổng tiền:
                    ${Number(don.tongTien || 0).toLocaleString("vi-VN")}đ
                </h3>

                <button class="nut-xem-chi-tiet"
                    data-id="${don.id}">
                    Xem chi tiết sản phẩm ▼
                </button>

                <button onclick="chonDonHang('${don.id}')">
                    Chọn để sửa
                </button>

                <div class="chi-tiet-san-pham"
                    id="chitiet-${don.id}"
                    style="display:none;">
                    ${chiTiet || "<p>Đơn hàng không có sản phẩm.</p>"}
                </div>
            </div>
        `;
    }).join("");

    let khuVuc = document.getElementById("lichSuDonHang");

    if (khuVuc) {
        khuVuc.innerHTML = html || "<p>Không có đơn hàng nào.</p>";

        khuVuc.querySelectorAll(".nut-xem-chi-tiet").forEach(function(nut) {
            nut.addEventListener("click", function() {
                let id = nut.dataset.id;
                let chiTiet = document.getElementById("chitiet-" + id);

                if (chiTiet.style.display === "none") {
                    chiTiet.style.display = "block";
                    nut.innerText = "Ẩn chi tiết sản phẩm ▲";
                } else {
                    chiTiet.style.display = "none";
                    nut.innerText = "Xem chi tiết sản phẩm ▼";
                }
            });
        });
    }
}

// Tìm đơn hàng theo mã hoặc tên
export function timDonHang() {
    let tuKhoa = document.getElementById("timDon").value.toLowerCase().trim();

    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let ketQua = donhang.filter(function(don) {
        return String(don.id).toLowerCase().includes(tuKhoa)
            || String(don.ten || "").toLowerCase().includes(tuKhoa);
    });

    hienthidonhang(ketQua);
}

// Chọn đơn hàng để sửa
export function chonDonHang(id) {
    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let don = donhang.find(function(item) {
        return String(item.id) === String(id);
    });

    if (don) {
        document.getElementById("maDon").value = don.id;
        document.getElementById("tenDon").value = don.ten || "";
        document.getElementById("sdtDon").value = don.sdt || "";
        document.getElementById("diachiDon").value = don.diachi || "";
        document.getElementById("tongTienDon").value = don.tongTien || 0;
        document.getElementById("trangThaiDon").value =
            don.trangThai || "Chờ xác nhận";
    }
}

// Thêm đơn hàng
export function themDonHang() {
    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let id = document.getElementById("maDon").value.trim();
    let ten = document.getElementById("tenDon").value.trim();

    if (id === "" || ten === "") {
        alert("Vui lòng nhập mã đơn và tên người đặt!");
        return;
    }

    let tim = donhang.find(function(don) {
        return String(don.id) === id;
    });

    if (tim) {
        alert("Mã đơn hàng đã tồn tại!");
        return;
    }

    let don = {
        id: id,
        ten: ten,
        sdt: document.getElementById("sdtDon").value,
        diachi: document.getElementById("diachiDon").value,
        tongTien: Number(document.getElementById("tongTienDon").value),
        trangThai: document.getElementById("trangThaiDon").value,
        ngayDat: new Date().toLocaleDateString("vi-VN"),
        sanPham: []
    };

    donhang.push(don);

    luuDonHang();
    hienthidonhang();

    alert("Thêm đơn hàng thành công!");
}

// Sửa đơn hàng theo mã
export function suaDonHang() {
    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let id = document.getElementById("maDon").value.trim();

    let don = donhang.find(function(item) {
        return String(item.id) === id;
    });

    if (don) {
        don.ten = document.getElementById("tenDon").value;
        don.sdt = document.getElementById("sdtDon").value;
        don.diachi = document.getElementById("diachiDon").value;
        don.tongTien = Number(document.getElementById("tongTienDon").value);
        don.trangThai = document.getElementById("trangThaiDon").value;

        luuDonHang();
        hienthidonhang();

        alert("Sửa đơn hàng thành công!");
    } else {
        alert("Không tìm thấy mã đơn hàng!");
    }
}

// Xóa đơn hàng theo mã
export function xoaDonHang() {
    donhang = JSON.parse(localStorage.getItem("order")) || [];

    let id = document.getElementById("maDon").value.trim();

    let tim = donhang.find(function(don) {
        return String(don.id) === id;
    });

    if (tim) {
        if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
            donhang = donhang.filter(function(don) {
                return String(don.id) !== id;
            });

            luuDonHang();
            hienthidonhang();

            alert("Xóa đơn hàng thành công!");
        }
    } else {
        alert("Không tìm thấy mã đơn hàng!");
    }
}

// Cho HTML gọi được các hàm
window.timDonHang = timDonHang;
window.chonDonHang = chonDonHang;
window.themDonHang = themDonHang;
window.suaDonHang = suaDonHang;
window.xoaDonHang = xoaDonHang;
