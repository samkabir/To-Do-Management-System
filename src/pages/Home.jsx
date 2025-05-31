import { useEffect, useRef, useState } from "react";
import TaskCard from "../components/UI/Cards/TaskCard";
import { useSnackbar } from "../contexts/SnackbarContext";
import { GetIcon } from "../icons";
import REButton from "../components/UI/REButton/REButton";
import REModal from "../components/UI/Modals/REModal/REModal";
import CreateTaskModal from "../components/UI/Modals/CreateTaskModal/CreateTaskModal";

export default function Home() {
    const [alltasks, setAllTasks] = useState([
        {
            id: 2,
            title: "Demo 2",
            description: "This is the second task.",
            status: "ongoing",
            createdAt: new Date().toLocaleString(),
            dueDate: '5/30/2025, 12:06:24 PM',
        },
        {
            id: 4,
            title: "Demo 4",
            description: "This is the Fouth task.",
            status: "ongoing",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 5,
            title: "Demo 5",
            description: "This is the Fifth task.",
            status: "done",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 6,
            title: "Demo 6",
            description: "This is the sixth task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 7,
            title: "Demo 7",
            description: "This is the 7th task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 8,
            title: "Demo 8",
            description: "This is the 8th task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
    ]);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [newTasks, setNewTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
     const hasCheckedOverdue = useRef(false);

    const snackbar = useSnackbar();

    const handleTaskDelete = (task) => {
        console.log("Task Delete Clicked", task);
        setAllTasks(alltasks.filter(t => t.id !== task.id));
        snackbar.showSnackbar("Task Deleted Successfully", "success");
    };

    const handleTaskCreate = async (newTask) => {
        try {
            setAllTasks(prevTasks => [...prevTasks, newTask]);
            snackbar.showSnackbar("Task Created Successfully", "success");
        } catch (error) {
            console.error("Error creating task:", error);
            snackbar.showSnackbar("Failed to create task", "error");
            throw error;
        }
    };

    const handleTaskUpdate = (updatedTask) => {
        console.log("Task Update Clicked", updatedTask);
        setAllTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
        snackbar.showSnackbar("Task Updated Successfully", "success");
    }

    const handleStatusChange = (taskId, newStatus) => {
        setAllTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, status: newStatus }
                    : task
            )
        );

        const statusMessages = {
            'new': 'Task moved to New',
            'ongoing': 'Task moved to Ongoing',
            'done': 'Task moved to Done'
        };

        snackbar.showSnackbar(statusMessages[newStatus] || 'Task status updated', "success");
    }

    

    useEffect(() => {
        const newTasks = alltasks.filter(task => task.status === "new").sort().reverse();
        const ongoingTasks = alltasks.filter(task => task.status === "ongoing").sort().reverse();
        const doneTasks = alltasks.filter(task => task.status === "done").sort().reverse();

        setNewTasks(newTasks);
        setOngoingTasks(ongoingTasks);
        setDoneTasks(doneTasks);
    }, [alltasks]);



    useEffect(() => {
        if (alltasks.length > 0 && !hasCheckedOverdue.current) {
            alltasks.forEach(task => {
                if (new Date(task.dueDate) < new Date() && task.status !== "done") {
                    snackbar.showSnackbar(`Task "${task.title}" is overdue!`, "warning");
                }
            });
            hasCheckedOverdue.current = true;
        }
    }, [alltasks, snackbar]);



    return (
        <>
            <div className="flex items-center justify-center my-5">
                <span className="font-bold text-xl">To-Do Task Management System</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">

                {/* New */}
                <div className="bg-blue-100 px-4 rounded shadow-black shadow-lg min-h-[88vh] max-h-[85vh] overflow-y-auto">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4 sticky top-0 bg-blue-100 z-10">
                        <div className="">
                            <h2 className="text-xl font-semibold text-blue-800">New</h2>
                        </div>

                        <div className="">
                            <REButton
                                text="Add New Task"
                                onClick={() => {
                                    setCreateModalOpen(true);
                                }}
                                className={' hover:bg-blue-400 hover:text-white font-semibold py-[4px] lg:py-[8px] px-[5px] lg:px-[10px] rounded-xl my-2 border-2 border-blue-500 text-blue-800'}
                                iconRight={<GetIcon name="NewIcon" className="w-6 h-6" />}
                            />
                        </div>
                    </div>
                    {/* All Tasks */}
                    <div className="">
                        {newTasks.length > 0 ? (
                            newTasks.map((task, index) => (
                                <TaskCard
                                    key={index}
                                    task={task}
                                    clickOnDelete={handleTaskDelete}
                                    onStatusChange={handleStatusChange}
                                    onTaskUpdate={handleTaskUpdate}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No new tasks available.</p>
                        )}
                    </div>
                </div>

                {/* Ongoing */}
                <div className="bg-orange-100 px-4 rounded shadow-black shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4 sticky top-0 bg-orange-100 z-10">
                        <div className="">
                            <h2 className="text-xl font-semibold text-orange-700">Ongoing</h2>
                        </div>
                        <div className=" py-[8px] px-[10px]  my-2">
                            <GetIcon name="OnGoingIcon" className="w-6 h-6 text-orange-700" />
                        </div>
                    </div>
                    {/* All Tasks */}
                    <div className="">
                        {ongoingTasks.length > 0 ? (
                            ongoingTasks.map((task, index) => (
                                <TaskCard
                                    key={index}
                                    task={task}
                                    clickOnDelete={handleTaskDelete}
                                    onStatusChange={handleStatusChange}
                                    onTaskUpdate={handleTaskUpdate}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No ongoing tasks available.</p>
                        )}
                    </div>
                </div>

                {/* Done */}
                <div className="bg-green-100 px-4 rounded shadow-black shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4 sticky top-0 bg-green-100 z-10">
                        <div className="">
                            <h2 className="text-xl font-semibold text-green-800">Done</h2>
                        </div>
                        <div className=" py-[8px] px-[10px]  my-2">
                            <GetIcon name="DoneIcon" className="w-6 h-6 text-green-800" />
                        </div>
                    </div>
                    {/* All Tasks */}
                    <div className="">
                        {doneTasks.length > 0 ? (
                            doneTasks.map((task, index) => (
                                <TaskCard
                                    key={index}
                                    task={task}
                                    clickOnDelete={handleTaskDelete}
                                    onStatusChange={handleStatusChange}
                                    onTaskUpdate={handleTaskUpdate}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No completed tasks available.</p>
                        )}
                    </div>
                </div>


                {/* Create Task Modal */}
                <CreateTaskModal
                    modalOpen={createModalOpen}
                    handleClose={() => setCreateModalOpen(false)}
                    onTaskCreate={handleTaskCreate}
                />
            </div>
        </>
    );
}