import { useCallback } from 'react';

export const useMessage = () => {
    return useCallback((text) => {
        if (text) {
            const body = document.querySelector('body');
            const messageBlock = document.createElement('div');
            messageBlock.style.display = 'none';
            messageBlock.innerHTML = `
                <div class="pop-up">
                    <p>${text}</p>
                </div> 
            `;

            body.appendChild(messageBlock);

            setTimeout(() => {
                messageBlock.style.display = 'block';
            }, 1000);

            setTimeout(() => {
                body.querySelector('.pop-up').remove();
            }, 3500);
        }
    }, []);
};