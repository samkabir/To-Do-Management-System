import { useEffect, useState } from "react";
import TaskCard from "../components/UI/Cards/TaskCard";
import { useSnackbar } from "../contexts/SnackbarContext";
import { GetIcon } from "../icons";
import REButton from "../components/UI/REButton/REButton";
import REModal from "../components/UI/Modals/REModal/REModal";

export default function Home() {
    const [Alltasks, setAllTasks] = useState([
        {
            id: 1,
            title: "Task 1",
            description: "This is the first task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 2,
            title: "Task 2",
            description: "This is the second task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: '5/30/2025, 12:06:24 PM',
        },
        {
            id: 3,
            title: "Task 3",
            description: "This is the Third task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 4,
            title: "Task 4",
            description: "This is the Fouth task.",
            status: "ongoing",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 5,
            title: "Task 5",
            description: "This is the Fifth task.",
            status: "done",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
        {
            id: 6,
            title: "Task 6",
            description: "This is the sixth task.",
            status: "new",
            createdAt: new Date().toLocaleString(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleString(),
        },
    ]);
    const [open, setOpen] = useState(false);
    const [newTasks, setNewTasks] = useState([]);
    const [ongoingTasks, setOngoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const handleCardView = (task) => {
        console.log("Task Card Clicked:", task);
        // This will Show a modal with task details
    }
    const clickOnEdit = (task) => {
        console.log("Edit modal will Open", task);
        // Clicking on this will open a modal with task details and allow editing
    }

    const handleTaskDelete = (task) => {
        console.log("Task Delete Clicked", task);
        setAllTasks(Alltasks.filter(t => t.id !== task.id));
        useSnackbar().showSnackbar("Task Deleted Successfully", "success");
    }

    // Implement a  right click context menu on task card, which will have two options like, if card is on Ongoing then it will have Move to done and move to new, if card is on done then it will have Move to ongoing and move to new, if card is on new then it will have Move to ongoing and move to done
    // Right click on the task card will show a context menu with options to move the task to different statuses (New, Ongoing, Done).
    // Left click on the task card will open a modal with task details.
    // Also add e.preventDefault() to prevent so that clicking on Edit and Delete icon does not trigger the Cardview modal



    useEffect(() => {
        const newTasks = Alltasks.filter(task => task.status === "new").sort().reverse();
        const ongoingTasks = Alltasks.filter(task => task.status === "ongoing").sort().reverse();
        const doneTasks = Alltasks.filter(task => task.status === "done").sort().reverse();

        setNewTasks(newTasks);
        setOngoingTasks(ongoingTasks);
        setDoneTasks(doneTasks);
    }, [Alltasks]);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3  gap-4 my-10">

                {/* New */}
                <div className="bg-blue-100 md:px-4 rounded shadow-black shadow-lg max-h-[90vh] overflow-y-auto">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4 sticky top-0 bg-blue-100 z-10">
                        <div className="">
                            <h2 className="text-xl font-semibold text-blue-800">New</h2>
                        </div>

                        <div className="">
                            <REButton
                                text="Add New Task"
                                onClick={() => {
                                    console.log("Add New Task Clicked");
                                }}
                                className={' hover:bg-blue-400 hover:text-white font-semibold py-[8px] px-[10px] rounded-xl my-2 border-2 border-blue-500 text-blue-800'}
                                iconRight={<GetIcon name="NewIcon" className="w-6 h-6" />}
                            />
                        </div>
                    </div>
                    {/* All Tasks */}
                    <div className="">
                        {newTasks.length > 0 ? (
                            newTasks.map((task, index) => (
                                <TaskCard key={index} task={task} onClick={()=>{handleCardView(task)}} clickOnDelete={handleTaskDelete} />
                            ))
                        ) : (
                            <p className="text-gray-500">No new tasks available.</p>
                        )}
                    </div>
                </div>

                {/* Ongoing */}
                <div className="bg-orange-100 md:px-4 rounded shadow-black shadow-lg">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4">
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
                                <TaskCard key={index} task={task}  onClick={()=>{handleCardView(task)}} clickOnDelete={handleTaskDelete} />
                            ))
                        ) : (
                            <p className="text-gray-500">No new tasks available.</p>
                        )}
                    </div>

                </div>

                {/* Done */}
                <div className="bg-green-100 md:px-4 rounded shadow-black shadow-lg">
                    {/* Top Part */}
                    <div className="flex items-center justify-between border-b-2 border-gray-400 mb-4">
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
                                <TaskCard key={index} task={task}  onClick={()=>{handleCardView(task)}} clickOnDelete={handleTaskDelete} />
                            ))
                        ) : (
                            <p className="text-gray-500">No new tasks available.</p>
                        )}
                    </div>

                </div>


             
                {/* <button onClick={handleSomeAction}>Do Something</button> */}
                <REModal
                    isOpen={open}
                    onClose={() => { }}
                    title="Create New Task"
                    content={<div>Create New Task</div>}
                    footer={
                        <div className="flex justify-end">
                            <REButton
                                text="Close"
                                onClick={() => { setOpen(false) }}
                                theme="secondary"
                            />
                        </div>
                    }
                />
            </div>
        </>
    );
}