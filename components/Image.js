const IconImage = {
    // type: vay/tra
    diVay: require("../assets/categories/divay.png"),
    thuNo: require("../assets/categories/thuno.png"),
    choVay: require("../assets/categories/chovay.png"),
    traNo: require("../assets/categories/trano.png"),

    // type: chi tieu
    anUong: require("../assets/categories/nhahang.png"),
    hoaDonTienIch: require("../assets/categories/hoadon.png"),
    diChuyen: require("../assets/categories/phidilai.png"),
    muaSam: require("../assets/categories/muasam.png"),
    banBeNguoiYeu: require("../assets/categories/tuthien.png"),
    giaiTri: require("../assets/categories/giaitri.png"),
    duLich: require("../assets/hobbies/004-camping.png"),
    sucKhoe: require("../assets/categories/tiennha.png"),
    giaDinh: require("../assets/categories/giadinh.png"),
    giaoDuc: require("../assets/categories/giaoduc.png"),
    dauTu: require("../assets/categories/dautu.png"),
    khoanChiKhac: require("../assets/categories/chitieukhac.png"),

    // type: thu nhap
    thuong: require("../assets/categories/thuong.png"),
    tienLai: require("../assets/categories/laisuat.png"),
    luong: require("../assets/categories/luong.png"),
    duocTang: require("../assets/categories/qua.png"),
    banDo: require("../assets/money/010-cash-1.png"),
    khoanThuKhac: require("../assets/money/018-investment-1.png"),

}

export const findIcon = (text) => {
    switch(text) {
        case 'Đi vay':
            return IconImage.diVay;
        case 'Thu nợ':
            return IconImage.thuNo;
        case 'Cho vay':
            return IconImage.choVay;
        case 'Trả nợ':
            return IconImage.traNo;

        case 'Ăn uống':
            return IconImage.anUong;
        case 'Hóa đơn & Tiện ích':
            return IconImage.hoaDonTienIch;
        case 'Di chuyển':
            return IconImage.diChuyen;
        case 'Mua sắm':
            return IconImage.muaSam;
        case 'Bạn bè & Người yêu':
            return IconImage.banBeNguoiYeu;
        case 'Giải trí':
            return IconImage.giaiTri;
        case 'Du lịch':
            return IconImage.duLich;
        case 'Sức khỏe':
            return IconImage.sucKhoe;
        case 'Gia đình':
            return IconImage.giaDinh;
        case 'Giáo dục':
            return IconImage.giaoDuc;
        case 'Đầu tư':
            return IconImage.dauTu;
        case 'Khoản chi khác':
            return IconImage.khoanChiKhac;

        case 'Thưởng':
            return IconImage.thuong;
        case 'Tiền lãi':
            return IconImage.tienLai;
        case 'Lương':
            return IconImage.luong;
        case 'Được tặng':
            return IconImage.duocTang;
        case 'Bán đồ':
            return IconImage.banDo;
        case 'Khoản thu khác':
            return IconImage.khoanThuKhac;
    }
}

export default IconImage;