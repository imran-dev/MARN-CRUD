import React from 'react';
import {useRef} from 'react';
import {ErrorToast, isEmpty, SuccessToast} from "../../Helpers/ValidationHelper";
import {Create} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";
import {useNavigate} from "react-router-dom";

const CreateForm = () => {
    const navigate = useNavigate();
    let Name, Code, Img, UnitPrice, Qty, TotalPrice, Loader = useRef();

    const SaveData = () => {
        if (isEmpty(Name.value)) {
            ErrorToast('Product Name Required');
        } else if (isEmpty(Code.value)) {
            ErrorToast('Product Code Required');
        } else if (isEmpty(Img.value)) {
            ErrorToast('Product Image Required');
        } else if (isEmpty(UnitPrice.value)) {
            ErrorToast('Product Unit Price Required');
        } else if (isEmpty(Qty.value)) {
            ErrorToast('Product Qty Required');
        } else if (isEmpty(TotalPrice.value)) {
            ErrorToast('Product Total Price Required');
        } else {
            Loader.classList.remove("d-none");

            Create(Name.value, Code.value, Img.value, UnitPrice.value, Qty.value, TotalPrice.value)
                .then((Result) => {
                    if (Result === true) {
                        Loader.classList.add("d-none");
                        SuccessToast('Product Added Successfully');
                        navigate('/');
                    } else {
                        ErrorToast('Request Fail, Try Again');
                    }
                })
                .catch((Error) => {
                    ErrorToast(Error);
                });
        }
    }

    return (
        <div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h4 className="animated fadeInUp">Create Product</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp">Product Name</label>
                                        <input ref={(input)=>Name=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp">Product Code</label>
                                        <input ref={(input)=>Code=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp"> Image</label>
                                        <input ref={(input)=>Img=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp"> Unit Price</label>
                                        <input ref={(input)=>UnitPrice=input}  type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp"> Qty</label>
                                        <input ref={(input)=>Qty=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <label className="animated fadeInUp"> Total Price</label>
                                        <input  ref={(input)=>TotalPrice=input} type="text" className="form-control animated fadeInUp"/>
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-md-4  p-2">
                                        <button onClick={SaveData} className="btn btn-primary  animated fadeInUp w-100">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-none" ref={(div) => Loader = div}>
                <FullScreenLoader/>
            </div>
        </div>
    );
};

export default CreateForm;