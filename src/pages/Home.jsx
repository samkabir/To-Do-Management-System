import { useSnackbar } from "../contexts/SnackbarContext";
import { GetIcon } from "../icons";

export default function Home() {
    const { showSuccess, showError, showWarning, showInfo } = useSnackbar();
    const handleSomeAction = () => {
        showSuccess("Operation completed successfully!");
    };
    return (
        <>

            <h1 className='text-2xl font-bold'>React + Tailwind + Icons + Snackbar + Resuable Button + Resuable Modal + Responsive Navbar</h1>
            <div className="card">

                <p>
                    This is a Template
                </p>

                <GetIcon name="TrashIcon" className="w-5 h-5 text-red-500" />


                <button onClick={handleSomeAction}>Do Something</button>
                
            </div>
        </>
    );
}