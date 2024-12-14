
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../redax/authslice";
import { useNavigate } from "react-router-dom";

const users = [
    { id: 1, name: "Michael Holz", dateCreated: "04/10/2013", role: "Admin", status: "Active", avatar: "https://i.pravatar.cc/50?img=1" },
    { id: 2, name: "Paula Wilson", dateCreated: "05/08/2014", role: "Publisher", status: "Active", avatar: "https://i.pravatar.cc/50?img=2" },
    { id: 3, name: "Antonio Moreno", dateCreated: "11/05/2015", role: "Publisher", status: "Suspended", avatar: "https://i.pravatar.cc/50?img=3" },
    { id: 4, name: "Mary Saveley", dateCreated: "06/09/2016", role: "Reviewer", status: "Active", avatar: "https://i.pravatar.cc/50?img=4" },
    { id: 5, name: "Martin Sommer", dateCreated: "12/08/2017", role: "Moderator", status: "Inactive", avatar: "https://i.pravatar.cc/50?img=5" },
    { id: 6, name: "Lucy Johnson", dateCreated: "08/22/2018", role: "Reviewer", status: "Active", avatar: "https://i.pravatar.cc/50?img=6" },
    { id: 7, name: "Jake Lee", dateCreated: "11/13/2019", role: "Publisher", status: "Active", avatar: "https://i.pravatar.cc/50?img=7" },
    { id: 8, name: "Emma Watson", dateCreated: "03/15/2020", role: "Admin", status: "Suspended", avatar: "https://i.pravatar.cc/50?img=8" },
    { id: 9, name: "Tom Hanks", dateCreated: "01/25/2021", role: "Moderator", status: "Inactive", avatar: "https://i.pravatar.cc/50?img=9" },
    { id: 10, name: "Sarah Parker", dateCreated: "06/10/2022", role: "Reviewer", status: "Active", avatar: "https://i.pravatar.cc/50?img=10" }
];

const ITEMS_PER_PAGE = 5;

// Function to render the status dot
const renderStatusDot = (status) => {
    if (status === "Active") {
        return <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>;
    } else if (status === "Inactive") {
        return <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block mr-2"></span>;
    } else if (status === "Suspended") {
        return <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>;
    }
};

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [userInfo, setUserInfo] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            navigate("/");
        } else {
            setUserInfo(JSON.parse(storedUser));
        }
    }, [navigate]);

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem("user");
        navigate("/");
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return users.slice(startIndex, endIndex);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    if (!userInfo) {
        return null;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                        <th className="py-3 px-4 w-10 text-left">#</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Date Created</th>
                        <th className="py-3 px-4 text-left">Role</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 w-24 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm">
                    {getPaginatedData().map((user) => (
                        <React.Fragment key={user.id}>
                            <tr className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-3 px-4">{user.id}</td>
                                <td className="py-3 px-4 flex items-center space-x-3">
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{user.name}</span>
                                </td>
                                <td className="py-3 px-4">{user.dateCreated}</td>
                                <td className="py-3 px-4">{user.role}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        {renderStatusDot(user.status)}
                                        <span className="font-semibold">{user.status}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 flex justify-center space-x-4">
                                    <button className="text-blue-500 hover:text-blue-600">⚙️</button>
                                    <button className="text-red-500 hover:text-red-600">❌</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="6">
                                    <hr className="border-t border-gray-200 my-2" />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageClick(index + 1)}
                        className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

