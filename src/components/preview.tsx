import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
}

const html = `
        <html>
        <head>
            <style> html { background-color: white;} </style>
        </head>
            <body>
                <div id="root"></div>
                <script>
                    const handleError = (err) => {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime error</h4>' + err + '</div>';
                        console.error(err);
                    };
                    
                    // async errors
                    window.addEventListener('error',(event)=> {
                        event.preventDefault();
                        handleError(event.error);
                    });

                    // sync errors
                    window.addEventListener('message',(event)=> {
                        try {
                            eval(event.data);
                        } catch(err) {
                            handleError(err);
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        const timer = setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
        return () => { clearTimeout(timer)}
    }, [code]);

    return <div className="preview-wrapper">
        <iframe 
            title="preview" 
            ref={iframe} 
            sandbox="allow-scripts" 
            srcDoc={html}/>
        </div>
};

export default Preview;