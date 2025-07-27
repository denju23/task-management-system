"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, createProject } from "../features/projects/projectsSlice";
import { Button, Modal, Spinner, Form } from "react-bootstrap";
import { useState } from "react";
import ProjectTable from '../components/ProjectTable'
import CreateProjectModal from '../components/projects/CreateProjectModal'
import { useRouter } from 'next/navigation';
import LogoutButton from '../components/LogoutButton'


const Dashboard = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);
    const [showModal, setShowModal] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);


    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);



    return (
        <div className="p-4">
            {mounted && (
                <>
                    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold">Dashboard</h2>

                        <div className="flex items-center gap-4" >
                            {/* Show Create Project button only for admin */}
                            {user?.user?.role === 'admin' && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    + Create Project
                                </button>
                            )}

                            <div className="whitespace-nowrap">
                                <LogoutButton />

                            </div>
                        </div>
                    </div>


                    {loading ? (
                        <div className="mt-4"><Spinner animation="border" /></div>
                    ) : error ? (
                        <p className="text-danger mt-4">{error}</p>
                    ) : (
                        <div className="mt-4">
                            {list.length === 0 ? (
                                <p>No projects available.</p>
                            ) : (
                                <div className="p-4">
                                    <h1 className="text-2xl font-bold">All Projects</h1>
                                    <ProjectTable data={list?.projects} />
                                </div>
                            )}
                        </div>
                    )}

                    <CreateProjectModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        onProjectCreated={(newProject) => {
                            console.log("New Project Created", newProject);
                        }}
                    />
                </>
            )}
        </div>
    );

};

export default Dashboard;
