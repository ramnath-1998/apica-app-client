import React from 'react'
import { useState } from "react";
import axios from "axios";

function Table(props) {

    const [node, setNode] = useState({ key: "", value: "", expiration: "" })
    const url = "/api/cache/node";


    const handleSubmitView = async () => {
        const response = await axios.post(url, {
            key: parseInt(node.key),
            value: parseInt(node.value),
            expiration: parseInt(node.expiration)
        });
        console.log('Viewed successfully', response);
        setNode(prevItem => ({ ...prevItem, key: '', value: 0, expiration: 0 }));
        window.location.reload();
    }

    const setItemAndDisplayPopup = (event) => {
        const popupName = event.currentTarget.getAttribute('popup-name')
        if (popupName === "view") {
            const itemString = event.currentTarget.getAttribute('data-item')
            const item = JSON.parse(itemString);
            setNode(prevItem => ({ ...prevItem, key: item.key, value: item.value, expiration: item.expiration }))
        }
    };


    const rows = props.data.map((item, index) => (
        <tr key={index} className='hover'>
            <th>{index + 1}</th>
            <td>{item.key}</td>
            <td>{item.value}</td>
            <td>{item.expiration}</td>
            <td>
                <button type="button" class="btn btn-primary" onClick={setItemAndDisplayPopup} data-toggle="modal" data-item={JSON.stringify(item)} data-target="#exampleModalCenter" popup-name="view">
                    View
                </button>
            </td>
        </tr>

    ));

    return (
        <div><table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Key</th>
                    <th scope="col">Value</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Edit or View</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>




            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <form>
                                <div class="form-group">
                                    <label for="key">Key : {node.key}</label>
                                    <br></br>
                                    <label for="value">Value : {node.value}</label>
                                    <br></br>
                                    <label for="expiry">Expiry : {node.expiration}</label>
                                </div>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={handleSubmitView} data-dismiss="modal" class="btn btn-primary">Save and Exit</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Table