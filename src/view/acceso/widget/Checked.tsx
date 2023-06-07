

const Checked = () => {
    return (
        <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
                <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300"
                />
            </div>
            <label
                htmlFor="remember"
                className="font-mont ml-2 text-sm font-medium text-gray-900 "
            >
                Recordarme
            </label>
        </div>
    );
}

export default Checked;