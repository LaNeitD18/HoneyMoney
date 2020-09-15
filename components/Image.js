import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';

const IconImage = [
    // type: vay/tra
    {type: 'diVay', iconPath: require("../assets/categories/divay.png")},
    {type: 'thuNo', iconPath: require("../assets/categories/thuno.png")},
    {type: 'choVay', iconPath: require("../assets/categories/chovay.png")},
    {type: 'traNo', iconPath: require("../assets/categories/trano.png")},

    // type: chi tieu
    {type: 'anUong', iconPath: require("../assets/categories/nhahang.png")},
    {type: 'hoaDonTienIch', iconPath: require("../assets/categories/hoadon.png")},
    {type: 'diChuyen', iconPath: require("../assets/categories/phidilai.png")},
    {type: 'muaSam', iconPath: require("../assets/categories/muasam.png")},
    {type: 'banBeNguoiYeu', iconPath: require("../assets/categories/tuthien.png")},
    {type: 'giaiTri', iconPath: require("../assets/categories/giaitri.png")},
    {type: 'duLich', iconPath: require("../assets/hobbies/004-camping.png")},
    {type: 'sucKhoe', iconPath: require("../assets/categories/tiennha.png")},
    {type: 'giaDinh', iconPath: require("../assets/categories/giadinh.png")},
    {type: 'giaoDuc', iconPath: require("../assets/categories/giaoduc.png")},
    {type: 'dauTu', iconPath: require("../assets/categories/dautu.png")},
    {type: 'khoanChiKhac', iconPath: require("../assets/categories/chitieukhac.png")},

    // type: thu nhap
    {type: 'thuong', iconPath: require("../assets/categories/thuong.png")},
    {type: 'tienLai', iconPath: require("../assets/categories/laisuat.png")},
    {type: 'luong', iconPath: require("../assets/categories/luong.png")},
    {type: 'duocTang', iconPath: require("../assets/categories/qua.png")},
    {type: 'banDo', iconPath: require("../assets/money/010-cash-1.png")},
    {type: 'khoanThuKhac', iconPath: require("../assets/money/018-investment-1.png")},

    // others
    {type: 'themdanhmuc', iconPath: require("../assets/categories/themdanhmuc.png")},
    {type: 'themdanhmuccon', iconPath: require("../assets/categories/themdanhmuccon.png")},
]

// export const IconView = () => {
//     return <View>
//         {IconImage.map((item, i) => {
            
//         })}
//     </View>
// }


export const findIcon = (text) => {
    let temp = "";
    IconImage.forEach(item => {
        if(text === item.type) {
            temp = item.iconPath;
        }
    });
    return temp;
}

export default IconImage;