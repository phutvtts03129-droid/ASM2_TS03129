
import { sanPham } from "./products.js";

// Lấy dữ liệu rau củ quả Green Mart
let danhSach = sanPham;

// Lưu dữ liệu
function luu() {
    localStorage.setItem("sanPham", JSON.stringify(danhSach));
}

// Hiển thị sản phẩm
export function hienThisp() {
    let html = "";

    danhSach.forEach(function(sp) {
        html += `
            <div>
                <p>ID: ${sp.id}</p>
                <p>Tên: ${sp.ten}</p>
                <p>Giá: ${Number(sp.gia).toLocaleString("vi-VN")}đ</p>
                <p>Đơn vị: ${sp.donVi || ""}</p>
                <p>Danh mục: ${sp.danhMuc || ""}</p>
                <img src="${sp.anh}" width="80">
                <hr>
            </div>
        `;
    });

let khuVuc = document.getElementById("list");

if (khuVuc) {
    khuVuc.innerHTML = html;
}
}

// Tìm sản phẩm theo ID
export function hienThiTheoID() {
    let id = Number(document.getElementById("id").value);

    let sp = danhSach.find(function(item) {
        return item.id == id;
    });

    if (sp) {
        document.getElementById("ten").value = sp.ten;
        document.getElementById("gia").value = sp.gia;
        document.getElementById("donVi").value = sp.donVi;
        document.getElementById("danhMuc").value = sp.danhMuc;
        document.getElementById("anh").value = sp.anh;
        document.getElementById("sold").value = sp.sold;

    } else {
        alert("Không tìm thấy sản phẩm!");
    }
}

// Thêm sản phẩm
export function them() {
    let id = Number(document.getElementById("id").value);

    let sp = {
        id: id,
        ten: document.getElementById("ten").value,
        gia: Number(document.getElementById("gia").value),
        donVi: document.getElementById("donVi").value,
        danhMuc: document.getElementById("danhMuc").value,
        anh: document.getElementById("anh").value,
        sold: Number(document.getElementById("sold").value),
        sanPhamMoi: false
    };

    let tim = danhSach.find(function(item) {
        return item.id == id;
    });

    if (tim) {
        alert("ID đã tồn tại!");
    } else {
        danhSach.push(sp);
        luu();
        hienThisp();
        alert("Thêm thành công!");
    }
}

// Sửa sản phẩm theo ID
export function sua() {
    let id = Number(document.getElementById("id").value);

    let sp = danhSach.find(function(item) {
        return item.id == id;
    });

    if (sp) {
        sp.ten = document.getElementById("ten").value;
        sp.gia = Number(document.getElementById("gia").value);
        sp.donVi = document.getElementById("donVi").value;
        sp.danhMuc = document.getElementById("danhMuc").value;
        sp.anh = document.getElementById("anh").value;
        sp.sold = Number(document.getElementById("sold").value);

        luu();
        hienThisp();
        alert("Sửa thành công!");
    } else {
        alert("Không tìm thấy ID!");
    }
}

// Xóa sản phẩm theo ID
export function xoa() {
    let id = Number(document.getElementById("id").value);

    let tim = danhSach.find(function(sp) {
        return sp.id == id;
    });

    if (tim) {
        danhSach = danhSach.filter(function(sp) {
            return sp.id != id;
        });

        luu();
        hienThisp();
        alert("Xóa thành công!");
    } else {
        alert("Không tìm thấy ID!");
    }
}

// Cho HTML gọi được các hàm
window.hienThiTheoID = hienThiTheoID;
window.them = them;
window.sua = sua;
window.xoa = xoa;
