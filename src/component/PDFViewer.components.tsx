import React, { useEffect, useRef } from 'react';
import * as PDFJS from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

// Configurar la ruta del archivo pdf.worker.js
PDFJS.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PDFViewerProps {
    pdfBlob: Blob;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfBlob }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadPDF = async () => {
            try {

                // Cargar el archivo PDF utilizando PDF.js
                const arrayBuffer = await pdfBlob.arrayBuffer();
                const loadingTask = PDFJS.getDocument(arrayBuffer);
                const pdf = await loadingTask.promise;
                const page = pdf.getPage(1)
                const scale = 1;
                const viewport = (await page).getViewport({scale});

                // Configurar el lienzo para renderizar la página
                const container = containerRef.current;
                const canvas = document.getElementById("pdf") as HTMLCanvasElement;
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Agregar el lienzo al contenedor
                container?.appendChild(canvas);
            } catch (error) {
                console.error('Error al cargar el archivo PDF:', error);
            }
        };

        loadPDF();
    }, [pdfBlob]);

    return <div className='h-[500px]' ref={containerRef}></div>;
};

export default PDFViewer;
