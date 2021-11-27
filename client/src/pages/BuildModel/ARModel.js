import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Col, Row } from "react-bootstrap";

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { getProject } from "../../redux/actions/projectActions";
import { Styles } from "./styles";
import cubeImg from '../../assets/cube.png';

const ARModel = () => {
    const dispatch = useDispatch();

    const { project_name } = useParams();

    const { project } = useSelector(state => state.project);
    const { user } = useSelector(state => state.auth);

    const [ currentIndex, setCurrentIndex ] = useState(0);

    useEffect(() => {
        if(project_name !== "") {
            dispatch(getProject(project_name))
        }
    }, [dispatch, project_name]);

    return (
        <Styles>
            <Row className="render-div">
                <Col>
                {
                    Object.keys(project).length > 0 && (
                        <model-viewer
                            class="render-area"
                            src={`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${project.name}/${project.images[currentIndex].filename.split(".")[0]}.glb`}
                            ios-src={`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${project.name}/${project.images[currentIndex].filename.split(".")[0]}.usdz`}
                            // poster={`${process.env.REACT_APP_UPLOAD_PATH}/${user.id}_${project.name}/${project.images[currentIndex].filename.split(".")[0]}.jpeg`}
                            camera-orbit="0rad 1.362rad auto"
                            shadow-intensity="1"
                            ar
                            ar-modes="webxr scene-viewer quick-look"
                            camera-controls
                            alt="3D model of a chair with footrest"
                        >
                            <button slot="ar-button" className="ar-button btn" style={{display: 'inline-block !important', zIndex: '999999', width: '42px', padding: '0 !important' }}>
                                <img src={cubeImg} alt="" width="42px" className="ar-img" />
                            </button>
                        </model-viewer>
                    )
                }
                </Col>
                <div className="slider">
                    <div className="slider-btn">
                        {
                            Object.keys(project).length > 0 && currentIndex === 0 ? (
                                <button onClick={(e) => setCurrentIndex(currentIndex - 1)} className="btn btn-link btn-left" disabled><FaAngleLeft /></button>
                            ) : (
                                <button onClick={(e) => setCurrentIndex(currentIndex - 1)} className="btn btn-link btn-left"><FaAngleLeft /></button>
                            )
                        }
                    </div>
                    <div className="slider-btn">
                        {
                            Object.keys(project).length > 0 && currentIndex === project.images.length - 1 ? (
                                <button onClick={(e) => setCurrentIndex(currentIndex + 1)} className="btn btn-link btn-right" disabled><FaAngleRight /></button>
                            ) : (
                                <button onClick={(e) => setCurrentIndex(currentIndex + 1)} className="btn btn-link btn-right"><FaAngleRight /></button>
                            )
                        }
                    </div>
                </div>
            </Row>
        </Styles>
    )
}

export default ARModel;