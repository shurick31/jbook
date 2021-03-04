import { useEffect, useState } from 'react';
import CodeEditor from './code-editor'
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');

    useEffect(()=>{
        let timer: any;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output);
        }, 800);
        return () => {clearTimeout(timer);}
    }, [input])

    return (
        <Resizable direction='vertical'>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue=""
                        onChange={(value) => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} />
            </div>
        </Resizable>
    );
}

export default CodeCell;
