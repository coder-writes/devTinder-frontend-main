import React from 'react';
import { getToken, hasToken, isTokenExpired, removeToken } from '../utils/tokenUtils';

const TokenDebug = () => {
    const [tokenInfo, setTokenInfo] = React.useState({});

    const refreshTokenInfo = () => {
        const token = getToken();
        const info = {
            hasToken: hasToken(),
            isExpired: isTokenExpired(),
            tokenPreview: token ? `${token.substring(0, 20)}...` : 'No token',
            fullToken: token
        };
        setTokenInfo(info);
    };

    React.useEffect(() => {
        refreshTokenInfo();
    }, []);

    const handleClearToken = () => {
        removeToken();
        refreshTokenInfo();
    };

    return (
        <div className="p-6 bg-gray-800 text-white rounded-lg max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Token Debug Information</h2>
            
            <div className="space-y-3">
                <div>
                    <strong>Has Token:</strong> {tokenInfo.hasToken ? '✅ Yes' : '❌ No'}
                </div>
                <div>
                    <strong>Is Expired:</strong> {tokenInfo.isExpired ? '❌ Yes' : '✅ No'}
                </div>
                <div>
                    <strong>Token Preview:</strong> 
                    <code className="ml-2 bg-gray-700 p-1 rounded">{tokenInfo.tokenPreview}</code>
                </div>
                {tokenInfo.fullToken && (
                    <div>
                        <strong>Full Token:</strong>
                        <textarea 
                            className="w-full mt-1 p-2 bg-gray-700 text-xs font-mono rounded"
                            rows="3"
                            readOnly
                            value={tokenInfo.fullToken}
                        />
                    </div>
                )}
            </div>
            
            <div className="mt-6 space-x-3">
                <button
                    onClick={refreshTokenInfo}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
                >
                    Refresh Info
                </button>
                <button
                    onClick={handleClearToken}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                >
                    Clear Token
                </button>
            </div>
        </div>
    );
};

export default TokenDebug;
