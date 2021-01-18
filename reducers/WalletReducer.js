const {UPDATEWALLETLIST } = require("../actions/actionType");
import {walletRef} from "../components/DataConnect"

const WalletReducer = (wallet = [], action) => {
    switch(action.type){
        case UPDATEWALLETLIST:
            wallet = []
            action.snap.forEach(element => {
              if(!element.toJSON().isDeleted)
                wallet.push(
                {
                  key: element.key,
                  name: element.toJSON().name,
                  color: element.toJSON().color,
                  date: element.toJSON().date,
                  isDefault:element.toJSON().isDefault,
                  money: element.toJSON().money
                });
            });
            return wallet.sort((a,b) => {if(a.isDefault == "true") return false; else return true;});
        default:
            return wallet;
    }
}

export default WalletReducer;