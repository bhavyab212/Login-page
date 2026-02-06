import { useState } from 'react';
import LoadingPage from './components/LoadingPage';
import './index.css';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <LoadingPage
                    onLoadComplete={handleLoadComplete}
                />
            ) : (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                    <div className="text-center space-y-6 p-8">
                        <h1 className="text-6xl font-bold text-white">
                            Welcome! 🎉
                        </h1>
                        <p className="text-2xl text-purple-200">
                            Your content has loaded successfully
                        </p>
                        <button
                            onClick={() => setIsLoading(true)}
                            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Show Loading Again
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
