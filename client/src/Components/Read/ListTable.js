import React, {useEffect, useState} from 'react';
import {Delete, Read} from "../../APIServices/CRUDServices";
import {Table} from "react-bootstrap";
import FullScreenLoader from "../Common/FullScreenLoader";
import {ErrorToast, SuccessToast} from "../../Helpers/ValidationHelper";
import {useNavigate} from "react-router-dom";

const ListTable = () => {
    const navigate = useNavigate();
    let [DataList, SetDataList] = useState([]);

    useEffect(() => {
        ReadDataList();
    }, []);

    const ReadDataList = () => {
        Read().then((Result) => {
            SetDataList(Result);
        }).catch((error) => {
            console.log(error);
        });
    }

    const DeleteItem = (id) => {
        Delete(id).then((result) => {
            if (result === true) {
                SuccessToast('Delete Success');
                ReadDataList();
            } else {
                ErrorToast('Delete Fail');
            }
        }).catch((error) => {
            ErrorToast(error);
        });
    }

    const UpdateItem = (id) => {
        navigate('/Update/'+id);
    }

    if (DataList.length > 0) {
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card list-card">
                                <div className="card-header pb-0">
                                    <h4>Product List</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Unit Price</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Qty</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Total Price</th>
                                            <th className="text-secondary opacity-7">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            DataList.map((item,i)=>{
                                                return(
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex  animated fadeInUp px-2 py-1">
                                                                <div>
                                                                    <img src={item.Img} className="avatar avatar-sm me-3" alt="user1"/>
                                                                </div>
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">{item.Name}</h6>
                                                                    <p className="text-xs text-secondary mb-0">{item.Code}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-0 animated fadeInUp text-sm"> {item.UnitPrice}</h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="mb-0 animated fadeInUp text-sm"> {item.Qty}</h6>
                                                        </td>

                                                        <td>
                                                            <h6 className="mb-0 animated fadeInUp text-sm">  {item.TotalPrice}</h6>

                                                        </td>
                                                        <td>
                                                            <div className="btn-group animated fadeInUp" role="group" aria-label="Basic example">
                                                                <button onClick={DeleteItem.bind(this,item._id)} className="btn btn-danger "><i className="fa fa-trash-alt"/></button>
                                                                <button onClick={UpdateItem.bind(this,item._id)} className="btn  btn-success "><i className="fa fa-edit"/></button>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )
                                            })

                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <FullScreenLoader/>
            </div>
        )
    }
};

export default ListTable;