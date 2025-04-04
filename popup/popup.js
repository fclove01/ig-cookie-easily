document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const getBtn = document.getElementById('GET');
    const logBtn = document.getElementById('LOG');
    const errorDiv = document.getElementById('error-message');
    const copyButton = document.getElementById('copy-button');
    const instagramUrl = 'https://www.instagram.com';

    // --- UI Helpers ---
    const setLoading = (isLoading) => {
        input.disabled = isLoading;
        getBtn.disabled = isLoading;
        logBtn.disabled = isLoading;
    };
    const showError = (msg) => { errorDiv.textContent = msg || 'An unknown error occurred.'; };
    const clearError = () => { errorDiv.textContent = ''; };
    copyButton.addEventListener('click', () => {
        const textToCopy = input.value;
        if (!textToCopy) {
            showError("Không có gì để sao chép.");
            return;
        }
        clearError();
        input.select(); 
        input.setSelectionRange(0, 99999); 

        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalContent = copyButton.innerHTML;   
            copyButton.innerHTML = '✓';
            copyButton.disabled = true;
            copyButton.title = "Đã sao chép!";

            setTimeout(() => {
                copyButton.innerHTML = originalContent; 
                copyButton.disabled = false;
                copyButton.title = "Sao chép nội dung";
            }, 1500); 

        }).catch(err => {
            showError('Không thể sao chép tự động. Hãy thử copy thủ công (Ctrl+C).');
            if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        });
    });

    // --- Cookie API Wrappers ---
    const getAllIgCookies = () => new Promise((resolve, reject) => {
        chrome.cookies.getAll({ url: instagramUrl }, cookies => {
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else resolve(cookies || []);
        });
    });

    const removeIgCookie = (cookie) => new Promise((resolve, reject) => {
        chrome.cookies.remove({ url: instagramUrl, name: cookie.name }, () => {
            if (chrome.runtime.lastError && chrome.runtime.lastError.message !== "No cookie found.") {
                reject(new Error(`Remove failed for '${cookie.name}': ${chrome.runtime.lastError.message}`));
            } else { resolve(); }
        });
    });

    const setIgCookie = (name, value) => new Promise((resolve, reject) => {
        chrome.cookies.set({ url: instagramUrl, name, value }, cookie => {
            if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
            else if (!cookie) reject(new Error(`Failed to set cookie: ${name}`));
            else resolve(cookie);
        });
    });
    
    // --- Core Login Logic ---
    async function processSingleLogin(cookieString) {

        // 1. Delete existing cookies
        const oldCookies = await getAllIgCookies();
        if (oldCookies.length > 0) {
            await Promise.all(oldCookies.map(removeIgCookie));
        }

        // 2. Parse and set new cookies from the validated string
        const cookiePairs = cookieString.split(';').filter(p => p.trim());
         if (cookiePairs.length === 0) {
            throw new Error('Chuỗi cookie không chứa cặp giá trị hợp lệ.');
        }
        const setPromises = cookiePairs.map(pair => {
            const firstEqual = pair.indexOf('=');
            if (firstEqual <= 0) return Promise.resolve();
            const name = pair.substring(0, firstEqual).trim();
            const value = pair.substring(firstEqual + 1).trim();
            if (!name) return Promise.resolve();
            return setIgCookie(name, value);
        }).filter(p => p); 

        if (setPromises.length === 0) {
            throw new Error('Không tìm thấy cặp cookie hợp lệ nào để đặt trong chuỗi.');
        }
        await Promise.all(setPromises);

        // 3. Open Instagram
        chrome.tabs.create({ url: instagramUrl });
    }

    
    // --- Button Event Listeners ---
    getBtn.addEventListener('click', async () => {
        clearError();
        setLoading(true);
        input.value = 'Fetching...';
        try {
            const cookies = await getAllIgCookies();
            input.value = cookies.length > 0
                ? cookies.map(c => `${c.name}=${c.value}`).join(';')
                : 'No cookies found.';
        } catch (err) {
            input.value = '';
            showError(`GET Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    });

    logBtn.addEventListener('click', async () => {
        clearError();
        const fullInput = input.value;
        if (!fullInput.trim()) {
            return showError('Ô nhập liệu trống.');
        }

        setLoading(true);
        let foundCandidate = false; 

        try {
            const potentialStrings = fullInput.replace(/\r\n/g, '|').replace(/\n/g, '|').split('|');

            for (const potentialString of potentialStrings) {
                const trimmedString = potentialString.trim();

                if (trimmedString && trimmedString.includes('ds_user_id=') || trimmedString.includes('sessionid=')) {
                    foundCandidate = true; 
                    try {
                        await processSingleLogin(trimmedString);
                        input.value = '';
                    } catch (err) {
                        showError(`Lỗi khi xử lý cookie: ${err.message}`);
                    } finally {
                        setLoading(false);
                        return; 
                    }
                } 
            } 

            if (!foundCandidate) {
                 showError('Không tìm thấy chuỗi cookie Instagram hợp lệ trong ô nhập liệu.');
            }

        } catch (err) {
            showError(`Lỗi không xác định: ${err.message}`);
        } finally {
             if (logBtn.disabled) {
                 setLoading(false);
             }
        }
    });

});