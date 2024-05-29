import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './navbar';
import UserInfoCard from './usercard';

const EngineerAssignments = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    if (!userInfo) {
        navigate('/');
    }
    
    const [engineerAssignments, setEngineerAssignments] = useState([]);
    let engineerId = null;

    useEffect(() => {
        if(userInfo){
        const { employeeid } = userInfo;
        engineerId = employeeid;
        const fetchEngineerAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/erpAssignment/engineerAssignments/${engineerId}`);
                setEngineerAssignments(response.data);
            } catch (error) {
                console.error('Error fetching engineer assignments:', error);
            }
        };

        fetchEngineerAssignments();}
    }, [engineerId, userInfo]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div>
            <Navbar />
            {userInfo && <UserInfoCard userInfo={userInfo} />}
            <div className="bg-white text-black p-4 m-9 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Engineer Assignments</h3>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Employee ID</th>
                            <th className="p-2 border">Aircraft ID</th>
                            <th className="p-2 border">Assignment Date</th>
                            <th className="p-2 border">Completion Date</th>
                            <th className="p-2 border">Assignment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {engineerAssignments.map((assignment) => (
                            <tr key={assignment.AssignmentID} className="bg-gray-100">
                                <td className="py-2 border text-center text-sm">{assignment.employeeid}</td>
                                <td className="py-2 border text-center text-sm">{assignment.aircraftid}</td>
                                <td className="py-2 border text-center text-sm">{formatDate(assignment.assignmentdate)}</td>
                                <td className="py-2 border text-center text-sm">{formatDate(assignment.completiondate)}</td>
                                <td className="py-2 border text-center text-sm">{assignment.assignmentstatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EngineerAssignments;
