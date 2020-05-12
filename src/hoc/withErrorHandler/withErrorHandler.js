import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import _Aux from '../_Aux/_Aux';

const withErrorHandler = (WrappedComponent,  axios) => {
    return class extends Component{

        state = {
            error: null
        }

        componentWillMount(){
            //this.req..deinw onoma stous interceptors gia na tous vgazw meta st unmount
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        //vgazw tous intereptors otan teleiwsei gia na min exw memoryleak
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler =() => {
            this.setState({error: null})
        }
        render(){
            return(
                <_Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message: null}
                    </Modal>            
                      <WrappedComponent {...this.props}/>
                </_Aux>
            );
        }
    }   
}

export default withErrorHandler;