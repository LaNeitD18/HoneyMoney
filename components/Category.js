class Cate {
    state = {
        typeID: "",
        categoryName: "",
        icon: "",
        parentID: ""
    }

    constructor(id, name, icon, parent) {
        this.state.typeID = id;
        this.state.categoryName = name;
        this.state.icon = icon;
        this.state.parentID = parent;
    }
    
}
export default Cate;