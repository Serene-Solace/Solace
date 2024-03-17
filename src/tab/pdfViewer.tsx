import { useCallback, useState, useEffect } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import AWS from 'aws-sdk';

import '../css/Sample.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import Toolbar from './toolBar';
import { View } from '@aws-amplify/ui-react';

AWS.config.update({
  region: 'ap-south-1', // e.g., 'us-east-1'
  credentials: new AWS.Credentials(import.meta.env.VITE_AWS_ACCESS_KEY_ID, import.meta.env.VITE_AWS_ACCESS_KEY_SECRET),
});

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type ChildProps = {
  file: any
 }

const PDFViewer: React.FC<ChildProps> = (props) => {
  
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [selectedText, setSelectedText] = useState<undefined | String>('');
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        setContextMenuPosition({
          x: range.right,
          y: range.bottom,
        });
        // console.log(selection);
        // console.log(selection.toString());
        setSelectedText(selection.toString().trim());
      } else {
        setSelectedText('');
        setResult('');
      }
    };

    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const renderPopup = () => {
    return (
      <>
        {result == '' && (
          <div 
            className="popup"
            style={{
              position: 'fixed',
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
            }}
          >
            <Toolbar _invokeLambda={() => invokeLambda()} _isLoading={isLoading}/>
          </div>
        )}
        {result != '' && (
          <View
            as="div"
            style={{
              position: 'fixed',
              top: contextMenuPosition.y,
              left: contextMenuPosition.x,
            }}
            display="flex"
            width="fit-content"
            height="fit-content"
            ariaLabel="View example"
            backgroundColor="var(--amplify-colors-white)"
            borderRadius="6px"
            border="1px solid var(--amplify-colors-black)"
            color="var(--amplify-colors-blue-60)"
            maxWidth="100%"
            padding="1rem"
            onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
            >
            {result}
          </View>
        )}
      </>
    );
  };

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const onItemClick = useCallback((args: { pageNumber: number }) => {
    console.log('Clicked an item', args);
  }, []);

  function handleMouseUp(): void {
    const selectedText = window.getSelection()?.toString();
    if (selectedText?.trim() != "") {
      console.log(`Selected text: ${selectedText}`);
      setSelectedText(selectedText);
      // invokeLambda();
    }
  }

  const invokeLambda = () => {
    setIsLoading(true);
    console.log("Inside the function");
    const lambda = new AWS.Lambda();
    const params = {
      FunctionName: "openai_invoke_api",
      Payload: JSON.stringify({
        text: selectedText,
      }),
    };

    lambda.invoke(params, (err, data) => {
      if (err) {
        console.error('Error invoking Lambda function:', err);
      } else {
        console.log('Lambda function invoked successfully:', data);
        if (data.Payload != undefined) {
          setResult(JSON.parse(data.Payload.toString())["body"]["response"]);
        }
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="Example">
      <header>
        <h1>react-pdf sample page</h1>
      </header>
      <div onMouseUp={handleMouseUp} className={selectedText != "" ? "Example__container_1" : "Example__container"}>
        <div className="Example__container__document" ref={setContainerRef}>
          <Document file={props.file} 
            onLoadSuccess={onDocumentLoadSuccess} 
            onItemClick={onItemClick}
            options={options}>
            //@ts-ignore
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
              />
            ))}
          </Document>
        </div>
      </div>
      {selectedText != undefined && selectedText != "" && renderPopup()}
    </div>
  );
}

export default PDFViewer;