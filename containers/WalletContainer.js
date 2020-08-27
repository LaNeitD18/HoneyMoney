import {connect} from 'react-redux';
import WalletScreen from '../screens/WalletScreen'
import {UpdateWalletAction } from "../actions";

//redux define container

const mapStateToProps = (state) => {
  return{
      walletData: state.WalletReducer,
  }
};

const mapDispatchToProps = (dispatch) =>{
  return {
      Update: (snap) => {
        dispatch(UpdateWalletAction(snap));
      }
  };
}
const WalletContainer = connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
export default WalletContainer;