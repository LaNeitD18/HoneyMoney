const IconImage = {
    divay: require("../assets/categories/divay.png"),
    thuno: require("../assets/categories/thuno.png"),
    chovay: require("../assets/categories/chovay.png"),
    trano: require("../assets/categories/trano.png"),
    
}

export const findIcon = (text) => {
    switch(text) {
        case 'divay':
            return IconImage.divay;
        case 'thuno':
            return IconImage.thuno;
        case 'chovay':
            return IconImage.chovay;
        case 'trano':
            return IconImage.trano;
    }
}

export default IconImage;