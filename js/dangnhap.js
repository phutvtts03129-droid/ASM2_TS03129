
import { product } from "./products.js";

// Lấy danh sách tài khoản
<<<<<<< HEAD
let danhSachTaiKhoan = JSON.parse(localStorage.getItem("taiKhoan"))
    || product.danhSachTaiKhoan;

// Hàm đăng nhập
function dangNhap() {
    let tenDangNhap = document.getElementById("tenDangNhap").value.trim();
    let matKhau = document.getElementById("matKhau").value;
    let thongBao = document.getElementById("thongBao");

    // Kiểm tra dữ liệu trống
    if (tenDangNhap == "" || matKhau == "") {
        thongBao.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    // Kiểm tra tên đăng nhập
    if (tenDangNhap.length < 4 || tenDangNhap.length > 20
        || !/^[a-zA-Z0-9_]+$/.test(tenDangNhap)) {
        thongBao.innerText = "Tên đăng nhập không hợp lệ!";
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (matKhau.length < 6 || matKhau.length > 50) {
        thongBao.innerText = "Mật khẩu phải từ 6 đến 50 ký tự!";
        return;
    }

    // Tìm tài khoản
    let taiKhoan = danhSachTaiKhoan.find(function(tk) {
        return tk.tenDangNhap.toLowerCase() == tenDangNhap.toLowerCase()
            && tk.matKhau == matKhau;
    });

    if (!taiKhoan) {
        thongBao.innerText = "Tên đăng nhập hoặc mật khẩu không đúng!";
        return;
    }

    // Lưu thông tin đăng nhập
    localStorage.setItem("nguoiDungDangNhap", JSON.stringify(taiKhoan));

    thongBao.style.color = "green";
    thongBao.innerText = "Đăng nhập thành công!";

    // Chuyển về trang chủ
    setTimeout(function() {
        window.location.href = "index.html";
    }, 700);
}

// Gọi hàm đăng nhập khi gửi form
document.getElementById("formDangNhap").addEventListener("submit", function(event) {
    event.preventDefault();
    dangNhap();
});
=======
let danhSachTaiKhoan = JSON.parse( localStorage.getItem("taiKhoan")) || product.danhSachTaiKhoan;

// Kiểm tra tên đăng nhập
function kiemTraTenDangNhap(tenDangNhap) {
    let dinhDangTen = /^[a-zA-Z0-9_]+$/;

    if (tenDangNhap.length < 4 || tenDangNhap.length > 20) {
        return "Tên đăng nhập phải từ 4 đến 20 ký tự!";
    }

    if (!dinhDangTen.test(tenDangNhap)) {
        return "Tên đăng nhập không đúng định dạng!";
    }
    return "";
}

// ================= ĐĂNG NHẬP =================
let formDangNhap = document.getElementById("formDangNhap");

if (formDangNhap) {
    formDangNhap.addEventListener("submit", function(event) {
        event.preventDefault();
        let tenDangNhap = document.getElementById("tenDangNhap").value.trim();
        let matKhau = document.getElementById("matKhau").value;
        let thongBao = document.getElementById("thongBao");

        thongBao.style.color = "red";

        // 1. Kiểm tra dữ liệu trống
        if (!tenDangNhap || !matKhau) {
            thongBao.innerText = "Vui lòng nhập tên đăng nhập và mật khẩu!";
            return;
        }

        // 2. Kiểm tra định dạng và chiều dài tên đăng nhập
        let loiTenDangNhap = kiemTraTenDangNhap(tenDangNhap);

        if (loiTenDangNhap) {
            thongBao.innerText = loiTenDangNhap;
            return;
        }

        // 3. Kiểm tra chiều dài mật khẩu
        if (matKhau.length < 6 || matKhau.length > 50) {
            thongBao.innerText = "Mật khẩu phải từ 6 đến 50 ký tự!";
            return;
        }

        // 4. Kiểm tra tài khoản và mật khẩu
        let taiKhoan = danhSachTaiKhoan.find(function(tk) {
            return tk.tenDangNhap.toLowerCase()
                === tenDangNhap.toLowerCase()
                && tk.matKhau === matKhau;
        });

        if (!taiKhoan) {
            thongBao.innerText = "Tên đăng nhập hoặc mật khẩu không đúng!";
            return;
        }

        // 5. Lưu thông tin người đăng nhập
        localStorage.setItem(
            "nguoiDungDangNhap",
            JSON.stringify(taiKhoan)
        );

        thongBao.style.color = "green";
        thongBao.innerText = "Đăng nhập thành công!";

        // 6. Chuyển về trang chủ
        setTimeout(function() {
            window.location.href = "index.html";
        }, 700);
    });
}
>>>>>>> 46c926a8e361cfacbf5210077b996621e361b87b
