import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './navbar';
import UserInfoCard from './usercard';

const CrewAssignments = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        navigate('/');
    }
    
    const [crewAssignments, setCrewAssignments] = useState([]);
    let crewId = null;

    useEffect(() => {
        if(userInfo){
        const { employeeid } = userInfo;
        crewId = employeeid;
        const fetchCrewAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/erpAssignment/crewAssignments/${crewId}`);
                setCrewAssignments(response.data);
            } catch (error) {
                console.error('Error fetching crew assignments:', error);
            }
        };

        fetchCrewAssignments();}
    }, [crewId, userInfo]);

    return (
        <div>
            <Navbar />
            {userInfo && <UserInfoCard userInfo={userInfo} />}
            <div className="bg-white text-black p-4 mt-9 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Crew Assignments</h3>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Employee ID</th>
                            <th className="p-2 border">Flight ID</th>
                            <th className="p-2 border">Assignment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crewAssignments.map((assignment) => (
                            <tr key={assignment.AssignmentID} className="bg-gray-100">
                                <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
                                <td className="py-2 border text-center text-sm">{assignment.flightid}</td>
                                <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CrewAssignments;
