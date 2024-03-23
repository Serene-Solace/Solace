import { useCallback, useState, useEffect } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import '../../css/Sample.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import PopupWithButton from './PopupWithButton';

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
  file: File | undefined
}

const PDFViewer: React.FC<ChildProps> = (props) => {

  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [selectedText, setSelectedText] = useState<undefined | String>('');
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        const range = selection.getRangeAt(0).getBoundingClientRect();
        setContextMenuPosition({
          x: range.right,
          y: range.bottom,
        });
        setSelectedText(selection.toString().trim());
      } else {
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

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
    }
  }

  return (
    <div className="Example">
      <div onMouseUp={handleMouseUp} className={selectedText != "" ? "Example__container_1" : "Example__container"}>
        <div className="Example__container__document" ref={setContainerRef}>
          <Document file={props.file}
            onLoadSuccess={onDocumentLoadSuccess}
            onItemClick={onItemClick}
            options={options}>
            {Array.from(new Array(numPages),
              // @ts-ignore 
              (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
                />
              ))}
          </Document>
        </div>
      </div>
      {selectedText != undefined && selectedText != "" && 
        <PopupWithButton 
          top={contextMenuPosition.y} 
          left={contextMenuPosition.x}
          fileName={props.file?.name}
          text={selectedText}
        />
      }
    </div>
  );
}

export default PDFViewer;