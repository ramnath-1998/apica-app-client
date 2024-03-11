import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";


function Navbar(props) {



    const [node, setNode] = useState({ key: "", value: "", expiration: "",});



    const url = "/api/cache/node";
 

    const handleSubmitView = async () => {
        const response = await axios.post(url, {
          key: parseInt(node.key),
          value: parseInt(node.value),
          expiration: parseInt(node.expiration)
        });
        console.log('Viewed successfully', response);
        setNode(prevItem => ({ ...prevItem, key: '', value: 0, expiration:0 }));
        window.location.reload();
        }


    const setItemAndDisplayPopup = (event) => {
        const popupName = event.currentTarget.getAttribute('popup-name')
        if (popupName === "view") {
            setNode(prevItem => ({ ...prevItem, key: node.key, value: node.value, expiration :node.expiration }))

        }
    };


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" >{props.page}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button type="button" class="btn btn-primary" onClick={setItemAndDisplayPopup} data-toggle="modal" data-target="#exampleModalCenter1" popup-name="view">
                    Add New Node
                </button>
            </nav>



            <div class="modal fade" id="exampleModalCenter1" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                    <label for="key">Key</label>
                                    <input class="form-control" type="text" value={node?.key || ''} onChange={e => setNode(prevItem => ({ ...prevItem, key: e.target.value }))} placeholder="key" />
                                    <br></br>
                                    <label for="key">Value</label>
                                    <input class="form-control" type="text" value={node?.value || ''} onChange={e => setNode(prevItem => ({ ...prevItem, value: e.target.value }))} placeholder="value" />
                                    <br></br>
                                    <label for="key">Expiration</label>
                                    <input class="form-control" type="text" value={node?.expiration || ''} onChange={e => setNode(prevItem => ({ ...prevItem, expiration: e.target.value }))} placeholder="value" />


                                </div>
                            </form>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onClick={handleSubmitView} data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmitView} data-dismiss="modal" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}

export default Navbar