import React, {useEffect, useRef} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {ErrorToast, isEmpty, SuccessToast} from "../../Helpers/ValidationHelper";
import {ReadByID, Update} from "../../APIServices/CRUDServices";
import FullScreenLoader from "../Common/FullScreenLoader";

const UpdateForm = () => {
    const params   = useParams();
    const navigate = useNavigate();

    let Name, Code, Img, UnitPrice, Qty, TotalPrice, Loader = useRef();

    const UpdateData = () => {
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

            Update(params['id'], Name.value, Code.value, Img.value, UnitPrice.value, Qty.value, TotalPrice.value)
                .then((Result) => {
                    if (Result === true) {
                        Loader.classList.add("d-none");
                        SuccessToast('Product Update Successfully');
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

    useEffect(() => {
        ReadByID(params['id']).then((Result) => {
            Name.value       = Result[0]['Name'];
            Code.value       = Result[0]['Code'];
            Img.value        = Result[0]['Img'];
            UnitPrice.value  = Result[0]['UnitPrice'];
            Qty.value        = Result[0]['Qty'];
            TotalPrice.value = Result[0]['TotalPrice'];
        }).catch((error) => {
            ErrorToast('Data Not Found! Bad Request!');
            navigate('/');
        });
    });

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header pb-0">
                                <h4 className="animated fadeInUp">Update Product</h4>
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
                                        <button onClick={UpdateData} className="btn btn-primary  animated fadeInUp w-100">Update</button>
                                    </div>
                                    <div className="col-md-4  p-2">
                                        <Link to='/' className="btn btn-info  animated fadeInUp w-100">Back</Link>
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

export default UpdateForm;